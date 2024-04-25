<template>
  <div class="card p-fluid">
    <div class="flex justify-between">
      <h1>Account Users</h1>
      <span class="relative">
        <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
        <InputText
          v-model="filters.global.value"
          placeholder="Global Search"
          class="pl-10 font-normal"
          @change="onFilter"
        />
        <Button
          label="Connect users"
          @click="(filters.global.value = 'johanna') && onFilter()"
        />
      </span>
    </div>
    <DataTable
      :value="users"
      lazy
      paginator
      edit-mode="row"
      v-model:editingRows="editingRows"
      @row-edit-save="onRowEditSave"
      :first="queryParams.offset"
      :rows="pageSize"
      v-model:filters="filters"
      data-key="id"
      :total-records="totalRecords"
      :loading="isLoading"
      @page="onPage"
      @sort="onSort"
      :global-filter-fields="['name', 'email', 'role']"
      _selection-mode="multiple"
      v-model:selection="selectedUsers"
      :select-all="allPageItemsSelected"
      @select-all-change="onSelectAllChange"
      table-style="min-width: 75rem"
    >
      <template #header>
        <div>
          {{ selectedUsers.length }} users selected
          <Button
            :disabled="selectedUsers.length === 0"
            v-if="!isEditingGlobal"
            icon="pi pi-pencil"
            label="Edit"
            @click="isEditingGlobal = !isEditingGlobal"
          />
          <Dropdown
            v-else
            v-model="globalEditRoles"
            :options="roles"
            option-label="label"
            option-value="value"
            placeholder="Select a Status"
            @change="onGlobalEditRolesChange"
          >
            <template #option="slotProps">
              <Tag
                :value="slotProps.option.label"
                :severity="getSeverity(slotProps.option.value)"
              />
            </template>
          </Dropdown>

          <Button
            :disabled="selectedUsers.length === 0"
            icon="pi pi-trash"
            label="Delete"
            @click="onGlobalDelete(selectedUsers)"
          />
        </div>
      </template>
      <Column
        selection-mode="multiple"
        header-style="width: 3rem"
      />
      <Column header-style="width: 3rem" />
      <Column
        field="name"
        header="User"
        sortable
      >
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img style="width: 32px; height: 32px; border-radius: 100%; background: #eee" />
            <span>
              <p>{{ data.name }}</p>
              <p>{{ data.email }}</p>
            </span>
          </div>
        </template>
        <template #editor="{ data }">
          <InputText v-model="data.name" />
          <InputText v-model="data.email" />
        </template>
      </Column>
      <Column
        field="role"
        header="Permission"
        filter-match-mode="contains"
        sortable
      >
        <template #body="{ data }">
          <Tag
            :value="roles.find(role => role.value === data.role)?.label"
            :severity="getSeverity(data.role)"
          />
        </template>
        <template #editor="{ data, field }">
          <Dropdown
            v-model="data[field]"
            :options="roles"
            option-label="label"
            option-value="value"
            placeholder="Select a Status"
          >
            <template #option="slotProps">
              <Tag
                :value="slotProps.option.label"
                :severity="getSeverity(slotProps.option.value)"
              />
            </template>
          </Dropdown>
        </template>
      </Column>
      <Column header="">
        <template #body="{ data, editorInitCallback }">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            @click="editorInitCallback"
          />
          <Button
            icon="pi pi-trash"
            @click="onDeleteRow(data)"
          />
        </template>
        <template #editor="{ editorSaveCallback, editorCancelCallback }">
          <Button
            icon="pi pi-check"
            @click="editorSaveCallback"
          />
          <Button
            icon="pi pi-times"
            @click="editorCancelCallback"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive, computed } from 'vue';
  import { UserService } from '@/service/UserService';
  import { FilterMatchMode } from 'primevue/api';
  import type {
    DataTablePageEvent,
    DataTableRowEditSaveEvent,
    DataTableSelectAllChangeEvent,
    DataTableSortEvent,
  } from 'primevue/datatable';

  export type User = {
    'id': number;
    'name': string;
    'email': string;
    'avatar': string;
    'role': keyof typeof severityMap;
  };

  onMounted(() => {
    loadLazyData();
  });

  const isEditingGlobal = ref(false);
  const globalEditRoles = ref();
  const isLoading = ref(false);
  const totalRecords = ref(0);
  const users = ref<User[]>([]);
  const selectedUsers = ref<User[]>([]);
  const editingRows = ref<User[]>([]);
  const filters = reactive({
    global: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS,
    },
  });
  const pageSize = 9;
  const queryParams = reactive({
    offset: 0,
    limit: pageSize,
    sortField: '' as 'name' | 'email' | 'role' | 'id',
    sortOrder: '' as 'asc' | 'desc',
    filter: filters.global.value,
  });

  export type QueryParams = typeof queryParams;

  const loadLazyData = () => {
    selectedUsers.value = [];
    isLoading.value = true;
    queryParams.limit = pageSize;

    setTimeout(() => {
      UserService
        .getUsers(queryParams)
        .then(response => {
          users.value = response.users;
          totalRecords.value = parseInt(response.totalRecords);
          queryParams.offset = parseInt(response.offset);
          queryParams.limit = parseInt(response.limit);

          isLoading.value = false;

          console.log('response', response);
        });
    }, Math.random() * 1000 + 250);
  };
  const onPage = (event: DataTablePageEvent) => {
    queryParams.offset = event.first;

    loadLazyData();
  };
  const onSort = (event: DataTableSortEvent) => {
    queryParams.sortField = event.sortField as typeof queryParams.sortField;
    queryParams.sortOrder = event.sortOrder === -1
      ? 'desc'
      : 'asc';
    queryParams.offset = event.first;

    loadLazyData();
  };
  const onFilter = () => {
    queryParams.filter = filters.global.value;
    queryParams.offset = 0;

    loadLazyData();
  };
  const onSelectAllChange = (event: DataTableSelectAllChangeEvent) => {
    selectedUsers.value = event.checked
      ? users.value
      : [];
  };
  const allPageItemsSelected = computed(() =>
    selectedUsers.value.length === users.value.length);

  const roles = [
    {
      value: 'ACCOUNT_MANAGER',
      label: 'Account manager',
    },
    {
      value: 'ADMIN',
      label: 'Admin',
    },
    {
      value: 'AGENT',
      label: 'Agent',
    },
    {
      value: 'EXTERNAL_REVIEWER',
      label: 'External reviewer',
    },
  ];
  const severityMap = {
    'ACCOUNT_MANAGER': 'danger',
    'ADMIN': 'success',
    'AGENT': 'info',
    'EXTERNAL_REVIEWER': 'warning',
  };
  const getSeverity = (status: User['role']) =>
    severityMap[status];
  const onRowEditSave = ({ newData, index }: DataTableRowEditSaveEvent) => {
    UserService.editUser(newData).then(persistedUser => {
      users.value[index] = persistedUser;
    });
  };
  const onGlobalEditRolesChange = () => {
    editingRows.value = [];

    const editedUsers = selectedUsers.value.map(({ id }) => ({
      id,
      role: globalEditRoles.value,
    }));

    UserService.editUsers(editedUsers).then((persistedUsers: User[]) => {
      users.value.forEach(user => {
        const persistedUser = persistedUsers.find(({ id }) => id === user.id);

        if (persistedUser) {
          Object.assign(user, persistedUser);
        }
      });
    });

    isEditingGlobal.value = false;
  };
  const onGlobalDelete = (users: User[]) => UserService
    .deleteUsers(users)
    .then(loadLazyData);
  const onDeleteRow = (user: User) => UserService
    .deleteUser(user)
    .then(loadLazyData);
</script>

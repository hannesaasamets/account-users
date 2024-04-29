<template>
  <div>
    <ThemeSwitcher />
    <div class="flex justify-between">
      <h1 class="text-xl font-medium">
        Account Users
      </h1>
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
    <div class="card p-fluid">
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
        selection-mode="multiple"
        v-model:selection="selectedUsers"
        :select-all="allPageItemsSelected"
        @select-all-change="onSelectAllChange"
        table-style="min-width: 75rem"
      >
        <template #header>
          <div>
            {{ selectedUsers.length }} users selected
            <span v-show="selectedUsers.length > 0">
              <Button
                :disabled="selectedUsers.length === 0"
                v-if="!isEditingGlobal"
                icon="pi pi-pencil"
                label="Edit"
                severity="secondary"
                class="ml-6 mr-2"
                outlined
                size="small"
                raised
                @click="onClickEditGlobal"
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
                <template #option="{ option }">
                  <Tag
                    :value="option.label"
                    :severity="option.severity"
                  />
                </template>
              </Dropdown>

              <Button
                :disabled="selectedUsers.length === 0"
                icon="pi pi-trash"
                label="Delete"
                severity="secondary"
                outlined
                size="small"
                raised
                @click="onGlobalDelete(selectedUsers)"
              />
            </span>
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
              <Avatar
                class="mr-2"
                shape="circle"
              />
              <span>
                <p>{{ data.name }}</p>
                <p>{{ data.email }}</p>
              </span>
            </div>
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
              :value="rolesByValue[data.role].label"
              :severity="rolesByValue[data.role].severity"
            />
          </template>
          <template #editor="{ data, field }">
            <Dropdown
              v-model="data[field]"
              :options="roles"
              option-label="label"
              option-value="value"
              placeholder="Select a Status"
              @click.stop
            >
              <template #option="{ option }">
                <Tag
                  :value="option.label"
                  :severity="option.severity"
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
              severity="secondary"
              class="mr-1"
              outlined
              size="small"
              raised
              @click="editorInitCallback"
            />
            <Button
              icon="pi pi-trash"
              @click="onDeleteRow(data)"
              severity="secondary"
              outlined
              size="small"
              raised
            />
          </template>
          <template #editor="{ editorSaveCallback, editorCancelCallback }">
            <Button
              icon="pi pi-check"
              severity="secondary"
              class="mr-1"
              outlined
              size="small"
              raised
              @click="editorSaveCallback"
            />
            <Button
              icon="pi pi-times"
              severity="secondary"
              outlined
              size="small"
              raised
              @click="editorCancelCallback"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive, computed, watch } from 'vue';
  import { type QueryParams, type User, UserService } from '@/service/UserService';
  import { FilterMatchMode } from 'primevue/api';
  import type {
    DataTablePageEvent,
    DataTableRowEditSaveEvent,
    DataTableSelectAllChangeEvent,
    DataTableSortEvent,
  } from 'primevue/datatable';
  import { roles, rolesByValue } from '@/constants/roles';

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
  const pageSize = 6;
  const queryParams = reactive<QueryParams>({
    offset: 0,
    limit: pageSize,
    sortField: 'id',
    sortOrder: 'asc',
    filter: filters.global.value,
  });

  onMounted(() => {
    loadPageData(() => selectedUsers.value = users.value.slice(1, 3));
  });

  const loadPageData = (onDataLoaded?: () => void) => {
    selectedUsers.value = [];
    isLoading.value = true;
    queryParams.limit = pageSize;

    setTimeout(() => {
      UserService
        .fetchUsers(queryParams)
        .then(response => {
          users.value = response.users;
          totalRecords.value = +response.totalRecords;
          queryParams.offset = +response.offset;
          queryParams.limit = +response.limit;

          isLoading.value = false;

          onDataLoaded?.();

          console.log('response', response);
        });
    }, Math.random() * 0 + 250);
  };
  const onPage = (event: DataTablePageEvent) => {
    queryParams.offset = event.first;

    loadPageData();
  };
  const onSort = (event: DataTableSortEvent) => {
    queryParams.sortField = event.sortField as typeof queryParams.sortField;
    queryParams.sortOrder = event.sortOrder === -1
      ? 'desc'
      : 'asc';
    queryParams.offset = event.first;

    loadPageData();
  };
  const onFilter = () => {
    queryParams.filter = filters.global.value;
    queryParams.offset = 0;

    loadPageData();
  };
  const onSelectAllChange = (event: DataTableSelectAllChangeEvent) => {
    selectedUsers.value = event.checked
      ? users.value
      : [];
  };
  const allPageItemsSelected = computed(() =>
    selectedUsers.value.length === users.value.length);
  const onRowEditSave = ({ newData, index }: DataTableRowEditSaveEvent) => {
    UserService.editUser(newData).then(persistedUser => {
      users.value[index] = persistedUser;

      setGlobalEditRolesIfSameSelected();
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
    .then(loadPageData);
  const onDeleteRow = (user: User) => UserService
    .deleteUser(user)
    .then(loadPageData);
  const onClickEditGlobal = () => {
    isEditingGlobal.value = true;
    setGlobalEditRolesIfSameSelected();
  };
  const setGlobalEditRolesIfSameSelected = () => {
    const firstRole = users.value.find(({ id }) => id === selectedUsers.value[0].id)?.role;
    const allSelectedWithSameRole = selectedUsers.value.every(selectedUser =>
      users.value.find(({ id }) => id === selectedUser.id)?.role === firstRole);

    globalEditRoles.value = allSelectedWithSameRole
      ? firstRole
      : undefined;
  };

  watch(selectedUsers, () => {
    if (selectedUsers.value.length === 0) {
      isEditingGlobal.value = false;
    } else {
      setGlobalEditRolesIfSameSelected();
    }
  });
</script>

<style>
  tr[data-p-highlight="false"]:hover > td:first-child,
  tr[data-p-highlight="false"]:hover > td:last-child {
    border-color: rgb(var(--surface-50));
  }
</style>

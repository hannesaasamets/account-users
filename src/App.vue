<template>
  <div class="col-span-full account-users">
    <ThemeSwitcher />
    <div class="flex flex-wrap justify-between items-center mb-5 gap-3.5">
      <h1 class="text-xl font-medium">
        Account users
      </h1>
      <div class="flex gap-3.5 flex-grow justify-self-end justify-end items-center">
        <span class="flex ml-auto">
          <span class="relative">
            <i class="pi pi-search absolute top-2/4 -mt-2 left-3.5 text-surface-400 dark:text-surface-600" />
            <InputText
              v-model="filters.global.value"
              placeholder="Search"
              class="pl-10 font-normal"
              @change="onFilter"
            />
          </span>
        </span>
        <Button label="Connect users" />
      </div>
    </div>
    <Card
      class="w-full"
      :pt="{
        body: '',
        content: '',
      }"
    >
      <template #content>
        <DataTable
          class="px-5 pt-2.5 pb-1.5 w-full"
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
        >
          <template #header>
            <div class="ml-1 h-10 flex items-center gap-7">
              <span class="text-lg font-medium">{{ selectedUsers.length }} users selected</span>
              <span
                v-show="selectedUsers.length > 0"
                class="flex gap-2"
              >
                <Button
                  :disabled="selectedUsers.length === 0"
                  v-if="!isEditingGlobal"
                  icon="pi pi-pencil"
                  label="Edit"
                  severity="secondary"
                  outlined
                  size="small"
                  raised
                  @click="onClickEditGlobal"
                />
                <Dropdown
                  size="small"
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
                      :severity="option.color"
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
            class="w-0"
          />
          <Column
            field="name"
            header="User"
            sortable
            class="pl-0"
          >
            <template #sorticon="{ sorted, sortOrder }">
              <i
                v-if="sorted"
                class="text-xs text-surface-500"
                :class="`pi pi-arrow-${sortOrder === 1 ? 'down' : 'up'}`"
              ></i>
            </template>
            <template #body="{ data }">
              <div class="flex items-center gap-3.5">
                <Avatar
                  shape="circle"
                  :image="data.avatar"
                />
                <span class="leading-6">
                  <p class="text-surface-700 font-medium">{{ data.name }}</p>
                  <p class="text-surface-500">{{ data.email }}</p>
                </span>
              </div>
            </template>
          </Column>
          <Column
            field="role"
            header="Permission"
            filter-match-mode="contains"
            sortable
            class="w-[144px]"
          >
            <template #sorticon="{ sorted, sortOrder }">
              <i
                v-if="sorted"
                class="text-xs text-surface-500"
                :class="`pi pi-arrow-${sortOrder === 1 ? 'down' : 'up'}`"
              ></i>
            </template>
            <template #body="{ data }">
              <Tag
                :value="rolesByValue[data.role].label"
                :severity="rolesByValue[data.role].color"
              />
            </template>
            <template #editor="{ data, field }">
              <Dropdown
                size="small"
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
                    :severity="option.color"
                  />
                </template>
              </Dropdown>
            </template>
          </Column>
          <Column
            header=""
            class="w-0"
          >
            <template #body="{ data, editorInitCallback }">
              <div class="flex gap-1 mx-2.5 visible-on-row-hover">
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  severity="secondary"
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
              </div>
            </template>
            <template #editor="{ editorSaveCallback, editorCancelCallback }">
              <div class="flex gap-1 mx-2.5">
                <Button
                  icon="pi pi-check"
                  severity="secondary"
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
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
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
  const pageSize = 9;
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
  .dark tr[data-p-highlight="false"]:hover > td:first-child,
  .dark tr[data-p-highlight="false"]:hover > td:last-child {
    border-color: rgb(var(--surface-700));
  }
  @media (hover: hover) {
    .visible-on-row-hover {
      opacity: 0;
      transition: opacity 0.2s;
    }
    tr:hover .visible-on-row-hover {
      opacity: 1;
    }
  }
  @media (min-width: 768px) {
    .account-users {
      min-width: 716px;
    }
  }
</style>

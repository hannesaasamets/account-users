<template>
  <DataTable
    :value="state.users"
    lazy
    paginator
    edit-mode="row"
    v-model:editingRows="editingRows"
    @row-edit-save="onRowEditSave"
    :first="state.offset"
    :rows="pageSize"
    data-key="id"
    :total-records="state.totalRecords"
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

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import type {
    DataTableFilterMeta,
    DataTableFilterMetaData,
    DataTablePageEvent,
    DataTableRowEditSaveEvent,
    DataTableSelectAllChangeEvent,
    DataTableSortEvent,
  } from 'primevue/datatable';
  import { type FetchUsersResponse, type QueryParams, type User, UserService } from '@/service/UserService';
  import { roles, rolesByValue } from '@/constants/roles';
  import { tick } from '@/utils';

  const props = defineProps<{
    filters: DataTableFilterMeta & {
      global: DataTableFilterMetaData;
    };
  }>();

  const isEditingGlobal = ref(false);
  const globalEditRoles = ref();
  const isLoading = ref(false);
  const selectedUsers = ref<User[]>([]);
  const editingRows = ref<User[]>([]);
  const pageSize = 9;
  const defaultQueryParams: QueryParams = {
    offset: 0,
    limit: pageSize,
    sortField: 'id',
    sortOrder: 'asc',
    filter: '',
  };
  const state = reactive<FetchUsersResponse>({
    users: [],
    offset: defaultQueryParams.offset,
    limit: defaultQueryParams.limit,
    sortField: defaultQueryParams.sortField,
    totalRecords: 0,
  });

  onMounted(() => {
    loadPageData();
  });

  const loadPageData = async (queryParams?: Partial<QueryParams>) => {
    isLoading.value = true;

    await tick(Math.random() * 1000 + 250);

    Object.assign(
      state,
      await UserService.fetchUsers({
        ...defaultQueryParams,
        ...queryParams,
        filter: props.filters.global.value,
      }),
    );

    selectedUsers.value = [];
    editingRows.value = [];
    isLoading.value = false;
  };

  const onPage = (event: DataTablePageEvent) => {
    loadPageData({
      offset: event.first,
    });
  };
  const onSort = (event: DataTableSortEvent) => {
    loadPageData({
      sortField: (event.sortField as QueryParams['sortField']),
      sortOrder: event.sortOrder === -1
        ? 'desc'
        : 'asc',
      offset: event.first,
    });
  };
  const onSelectAllChange = (event: DataTableSelectAllChangeEvent) => {
    selectedUsers.value = event.checked
      ? state.users
      : [];
  };
  const allPageItemsSelected = computed(() =>
    selectedUsers.value.length === state.users.length);
  const onRowEditSave = async ({ newData, index }: DataTableRowEditSaveEvent) => {
    state.users[index] = await UserService.editUser(newData);

    setGlobalEditRolesIfSameSelected();
  };
  const onGlobalEditRolesChange = async () => {
    editingRows.value = [];

    const editedUsers = selectedUsers.value.map(({ id }) => ({
      id,
      role: globalEditRoles.value,
    }));

    const persistedUsers = await UserService.editUsers(editedUsers);

    state.users.forEach(user => Object.assign(
      user,
      persistedUsers.find(({ id }) => id === user.id),
    ));

    isEditingGlobal.value = false;
  };
  const onGlobalDelete = async (users: User[]) => {
    await UserService.deleteUsers(users);
    await loadPageData();
  };
  const onDeleteRow = async (user: User) => {
    await UserService.deleteUser(user);
    await loadPageData();
  };
  const onClickEditGlobal = () => {
    isEditingGlobal.value = true;
    setGlobalEditRolesIfSameSelected();
  };
  const setGlobalEditRolesIfSameSelected = () => {
    const firstRole = state.users.find(({ id }) => id === selectedUsers.value[0].id)?.role;
    const allSelectedWithSameRole = selectedUsers.value.every(selectedUser =>
      state.users.find(({ id }) => id === selectedUser.id)?.role === firstRole);

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
  watch(props.filters.global, () => {
    loadPageData();
  });
</script>

<style>
  tr[data-p-highlight="false"]:hover > td:first-child,
  tr[data-p-highlight="false"]:hover > td:last-child {
    border-color: rgb(var(--surface-50));
  }
  .dark tr[data-p-highlight="false"]:hover > td:first-child,
  .dark tr[data-p-highlight="false"]:hover > td:last-child {
    border-color: rgb(var(--surface-800));
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
</style>

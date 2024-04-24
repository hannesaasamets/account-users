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
      :value="customers"
      lazy
      paginator
      :first="queryParams.offset"
      :rows="pageSize"
      v-model:filters="filters"
      data-key="id"
      :total-records="totalRecords"
      :loading="loading"
      @page="onPage"
      @sort="onSort"
      :global-filter-fields="['name', 'email', 'role']"
      selection-mode="multiple"
      v-model:selection="selectedCustomers"
      :select-all="allPageItemsSelected"
      @select-all-change="onSelectAllChange"
      table-style="min-width: 75rem"
    >
      <template #header>
        <div>
          {{ selectedCustomers.length }} users selected
          <Button
            icon="pi pi-pencil"
            label="Edit"
          />
          <Button
            icon="pi pi-trash"
            label="Delete"
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
        header="Name"
        sortable
      >
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img style="width: 32px" />
            <span>{{ data.name }}</span>
          </div>
        </template>
      </Column>
      <Column
        field="email"
        header="E-mail"
        sortable
      />
      <Column
        field="role"
        header="Permission"
        filter-match-mode="contains"
        sortable
      >
        <template #body="{ data }">
          <Tag
            :value="data.role"
            :severity="getSeverity(data.role)"
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
  import type { DataTablePageEvent, DataTableSelectAllChangeEvent, DataTableSortEvent } from 'primevue/datatable';

  onMounted(() => {
    loadLazyData();
  });

  const loading = ref(false);
  const totalRecords = ref(0);
  const customers = ref([]);
  const selectedCustomers = ref([]);
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
    sortField: '',
    sortOrder: '',
    filter: filters.global.value,
  });
  const loadLazyData = () => {
    selectedCustomers.value = [];
    loading.value = true;
    queryParams.limit = pageSize;

    setTimeout(() => {
      UserService
        .getUsers(queryParams)
        .then(response => {
          customers.value = response.users;
          totalRecords.value = parseInt(response.totalRecords);
          queryParams.offset = parseInt(response.offset);
          queryParams.limit = parseInt(response.limit);

          loading.value = false;

          console.log('response', response);
        });
    }, Math.random() * 1000 + 250);
  };
  const onPage = (event: DataTablePageEvent) => {
    queryParams.offset = event.first;

    loadLazyData();
  };
  const onSort = (event: DataTableSortEvent) => {
    queryParams.sortField = event.sortField as string;
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
    selectedCustomers.value = event.checked
      ? customers.value
      : [];
  };
  const allPageItemsSelected = computed(() =>
    selectedCustomers.value.length === customers.value.length);

  const statusMap = {
    'ACCOUNT_MANAGER': 'danger',
    'ADMIN': 'success',
    'AGENT': 'info',
    'EXTERNAL_REVIEWER': 'warning',
  };
  const getSeverity = (status: keyof typeof statusMap) =>
    statusMap[status];
</script>

<template>
  <div class="card p-fluid">
    <DataTable
      :value="customers"
      lazy
      paginator
      :first="first"
      :rows="10"
      v-model:filters="filters"
      ref="dt"
      data-key="id"
      :total-records="totalRecords"
      :loading="loading"
      @page="onPage($event)"
      @sort="onSort($event)"
      @filter="onFilter($event)"
      filter-display="row"
      :global-filter-fields="['name', 'country.name', 'company', 'representative.name']"
      v-model:selection="selectedCustomers"
      :select-all="selectAll"
      @select-all-change="onSelectAllChange"
      @row-select="onRowSelect"
      @row-unselect="onRowUnselect"
      table-style="min-width: 75rem"
    >
      <Column
        selection-mode="multiple"
        header-style="width: 3rem"
      />
      <Column
        field="name"
        header="Name"
        filter-match-mode="startsWith"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback"
            class="p-column-filter"
            placeholder="Search"
          />
        </template>
      </Column>
      <Column
        field="country.name"
        header="Country"
        filter-field="country.name"
        filter-match-mode="contains"
        sortable
      >
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img
              alt="flag"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`flag flag-${data.country.code}`"
              style="width: 24px"
            />
            <span>{{ data.country.name }}</span>
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback"
            class="p-column-filter"
            placeholder="Search"
          />
        </template>
      </Column>
      <Column
        field="company"
        header="Company"
        filter-match-mode="contains"
        sortable
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback"
            class="p-column-filter"
            placeholder="Search"
          />
        </template>
      </Column>
      <Column
        field="representative.name"
        header="Representative"
        filter-field="representative.name"
        sortable
      >
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img
              :alt="data.representative.name"
              :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
              style="width: 32px"
            />
            <span>{{ data.representative.name }}</span>
          </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback"
            class="p-column-filter"
            placeholder="Search"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { CustomerService } from '@/service/CustomerService';

  onMounted(() => {
    loading.value = true;

    lazyParams.value = {
      first: 0,
      rows: 10,
      sortField: null,
      sortOrder: null,
      filters: filters.value,
    };

    loadLazyData();
  });

  const dt = ref();
  const loading = ref(false);
  const totalRecords = ref(0);
  const customers = ref();
  const selectedCustomers = ref();
  const selectAll = ref(false);
  const first = ref(0);
  const filters = ref({
    'name': {
      value: '',
      matchMode: 'contains',
    },
    'country.name': {
      value: '',
      matchMode: 'contains',
    },
    'company': {
      value: '',
      matchMode: 'contains',
    },
    'representative.name': {
      value: '',
      matchMode: 'contains',
    },
  });
  const lazyParams = ref({});
  const loadLazyData = (event) => {
    console.log('loadLazyData', event);

    loading.value = true;
    lazyParams.value = {
      ...lazyParams.value,
      first: event?.first || first.value,
    };

    setTimeout(() => {
      CustomerService.getCustomers({
        lazyEvent: JSON.stringify(lazyParams.value),
      }).then((data) => {
        customers.value = data.customers;
        totalRecords.value = data.totalRecords;
        loading.value = false;
      });
    }, Math.random() * 1000 + 250);
  };
  const onPage = (event) => {
    console.log('onPage', event);

    lazyParams.value = event;
    loadLazyData(event);
  };
  const onSort = (event) => {
    console.log('onSort', event);

    lazyParams.value = event;
    loadLazyData(event);
  };
  const onFilter = (event) => {
    console.log('onFilter', event);

    lazyParams.value.filters = filters.value;
    loadLazyData(event);
  };
  const onSelectAllChange = (event) => {
    selectAll.value = event.checked;

    if (selectAll.value) {
      CustomerService.getCustomers().then(data => {
        selectAll.value = true;
        selectedCustomers.value = data.customers;
      });
    } else {
      selectAll.value = false;
      selectedCustomers.value = [];
    }
  };
  const onRowSelect = () => {
    selectAll.value = selectedCustomers.value.length === totalRecords.value;
  };
  const onRowUnselect = () => {
    selectAll.value = false;
  };
</script>

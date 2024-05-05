<template>
  <div class="min-w-[716px]">
    <div class="flex flex-wrap justify-between items-center mb-5 gap-3.5">
      <h1 class="text-xl font-medium">
        Account users
      </h1>
      <div class="flex gap-3.5 flex-grow justify-self-end justify-end items-center">
        <span class="flex ml-auto">
          <span class="relative">
            <i class="pi pi-search absolute top-2/4 -mt-2 left-3.5 text-surface-400 dark:text-surface-600" />
            <InputText
              :value="filters.global.value"
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
        <users-table
          class="px-5 pt-2.5 pb-1.5 w-full"
          :filters="filters"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { FilterMatchMode } from 'primevue/api';
  import UsersTable from '@/components/UsersTable.vue';

  const filters = reactive({
    global: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS,
    },
  });
  const onFilter = (event: Event) => {
    filters.global.value = (event.target as HTMLInputElement).value;
  };
</script>

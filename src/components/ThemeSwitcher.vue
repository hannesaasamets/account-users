<template>
  <div class="absolute right-7 flex justify-end p-2 mb-5">
    <ul class="flex list-none m-0 p-0 gap-2 items-center">
      <li class="relative">
        <button
          v-styleclass="{
            selector: '@next',
            enterClass: 'hidden',
            enterActiveClass: 'scalein',
            leaveToClass: 'hidden',
            leaveActiveClass: 'fadeout',
            hideOnOutsideClick: true,
          }"
          type="button"
          class="inline-flex border w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded"
        >
          <i class="pi pi-palette dark:text-white"></i>
        </button>
        <theme-configurator />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import ThemeConfigurator from '@/components/ThemeConfigurator.vue';

  export default {
    name: 'theme-switcher',
    components: {
      ThemeConfigurator,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>

<template>
  <div class="absolute top-[2.5rem] right-0 hidden w-[14rem] p-3 bg-white dark:bg-surface-800 rounded-md shadow border border-surface-200 dark:border-surface-700 flex-col justify-start items-start gap-3.5 inline-flex origin-top z-10">
    <div class="flex-col justify-start items-start gap-2 inline-flex w-full">
      <span class="text-black dark:text-surface-0 text-sm font-medium">Preset</span>
      <div class="custom-selectbutton inline-flex p-[0.28rem] items-start gap-[0.28rem] rounded-[0.71rem] border border-[#00000003] bg-surface-100 dark:bg-surface-900 w-full">
        <button
          type="button"
          class="px-[0.5rem] w-full tracking-tight py-[0.3rem] leading-none rounded-md text-surface-900 dark:text-surface-0 hover:bg-surface-50 dark:hover:bg-surface-800 focus:outline-none duration-200 transition-[backgroundColor]"
          :class="{
            'shadow shadow-inner bg-surface-0 dark:bg-surface-800 dark:shadow-[inset_0px_1px_0px_0px_var(--surface-800)]': isKlaus,
            'bg-surface-100 dark:bg-surface-900': !isKlaus,
          }"
          @click="setPreset('klaus')"
        >
          Klaus
        </button>
        <button
          type="button"
          class="px-[0.5rem] w-full tracking-tight py-[0.3rem] leading-none rounded-md text-surface-900 dark:text-surface-0 hover:bg-surface-50 dark:hover:bg-surface-800 focus:outline-none duration-200 transition-[backgroundColor]"
          :class="{
            'shadow shadow-inner bg-surface-0 dark:bg-surface-800 dark:shadow-[inset_0px_1px_0px_0px_var(--surface-800)]': isLara,
            'bg-surface-100 dark:bg-surface-900': !isLara,
          }"
          @click="setPreset('lara')"
        >
          Lara
        </button>
        <button
          type="button"
          class="px-[0.5rem] w-full tracking-tight py-[0.3rem] leading-none rounded-md text-surface-900 dark:text-surface-0 hover:bg-surface-50 dark:hover:bg-surface-800 focus:outline-none duration-200 transition-[backgroundColor]"
          :class="{
            'shadow shadow-inner bg-surface-0 dark:bg-surface-800 dark:shadow-[inset_0px_1px_0px_0px_var(--primary-400)]': isWind,
            'bg-surface-100 dark:bg-surface-900': !isWind,
          }"
          @click="setPreset('wind')"
        >
          Wind
        </button>
      </div>
      <button
        type="button"
        class="mt-2 inline-flex gap-2 border w-full h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded"
        @click="onThemeToggler"
      >
        <i :class="`dark:text-white pi ${iconClass}`" />
        {{ isDark ? 'Potential Dark' : 'Light' }} Theme
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'theme-configurator',
    data() {
      return {
        iconClass: 'pi-moon',
        isDark: false,
      };
    },
    computed: {
      isKlaus() {
        return this.$appState.preset === 'klaus';
      },
      isLara() {
        return this.$appState.preset === 'lara';
      },
      isWind() {
        return this.$appState.preset === 'wind';
      },
    },
    mounted() {
      const root = document.getElementsByTagName('html')[0];

      this.isDark = root.classList.contains('dark');
    },
    methods: {
      onThemeToggler() {
        const root = document.getElementsByTagName('html')[0];

        root.classList.remove('light');
        root.classList.toggle('dark');

        this.isDark = root.classList.contains('dark');
        this.iconClass = this.iconClass === 'pi-moon' ? 'pi-sun' : 'pi-moon';
      },
      setPreset(preset) {
        this.$appState.preset = preset;
      },
    },
  };
</script>

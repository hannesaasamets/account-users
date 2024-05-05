import Klaus from '@/themes/klaus';
import Lara from '@/themes/lara';
import Wind from '@/themes/wind';
import { reactive, watch, type App } from 'vue';

const presetsByName = {
  klaus: Klaus,
  lara: Lara,
  wind: Wind,
};

export default {
  install: (app: App) => {
    const _appState = reactive({
      preset: 'klaus',
    });

    watch(
      () => _appState.preset,
      (newValue) => {
        app.config.globalProperties.$primevue.config.pt = presetsByName[newValue as keyof typeof presetsByName];
      },
    );

    app.config.globalProperties.$appState = _appState;
  },
};

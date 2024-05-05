import 'primeicons/primeicons.css';
import './assets/main.css';

import { createApp } from 'vue';
import App from '@/App.vue';
import PrimeVue from 'primevue/config';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import StyleClass from 'primevue/styleclass';
import Tag from 'primevue/tag';
import ThemeSwitcher from './components/ThemeSwitcher.vue';
import ThemeConfigurator from './components/ThemeConfigurator.vue';
import Klaus from '@/themes/klaus';
import appState from './plugins/appState.js';

const app = createApp(App);

app.use(PrimeVue, {
  ripple: true,
  unstyled: true,
  pt: Klaus,
});

app.directive('styleclass', StyleClass);

app.component('Avatar', Avatar);
app.component('Button', Button);
app.component('Card', Card);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Dropdown', Dropdown);
app.component('InputText', InputText);
app.component('Tag', Tag);

app.component('ThemeSwitcher', ThemeSwitcher);
app.component('ThemeConfigurator', ThemeConfigurator);
app.use(appState);

app.mount('#app');

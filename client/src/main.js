import 'toastr/build/toastr.min.css';
import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';
import './util/toastrConfig.js';

const app = mount(App, {
  target: document.getElementById('app')
});

export default app;

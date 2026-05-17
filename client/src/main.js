import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';
import './util/toastrConfig.js';
import 'toastr/build/toastr.min.css';

const app = mount(App, {
  target: document.getElementById('app')
});

export default app;

import toastr from 'toastr';
import { navigate } from 'svelte5-router';
import { fetchGet, fetchPost } from './fetchHelper.js';
import { auth } from '../stores/userStore.svelte.js';

export async function authMe() {
  const resp = await fetchGet('/auth/me');
  if (!resp || !resp.ok) {
    auth.user = null;
    auth.isAuthenticated = false;
    return;
  }
  auth.user = await resp.json();
  auth.isAuthenticated = true;
}

export async function login(identifier, password) {
  const resp = await fetchPost('/auth/login', { identifier, password });

  if (!resp || !resp.ok) {
    const error = await resp.json();
    toastr.error(error.message);
    auth.user = null;
    auth.isAuthenticated = false;
    return;
  }

  await authMe();
  toastr.success('You are know logged in!');
  navigate('/profile', { replace: true });
}

export async function signup(email, username, password) {
  const resp = await fetchPost('/auth/signup', {
    email,
    username,
    password
  });

  if (!resp || !resp.ok) {
    const error = await resp.json();
    toastr.error(error.message);
    auth.user = null;
    auth.isAuthenticated = false;
    return;
  }

  await login(email, password);
  toastr.success('You have now signed up :)');
}

export async function logout() {
  const resp = await fetchPost('/auth/logout', {});

  if (!resp || !resp.ok) {
    const error = await resp.json();
    toastr.error(error.message);
    return;
  }

  auth.user = null;
  auth.isAuthenticated = false;
  navigate('/login', { replace: true });
  toastr.success('You have logged out..');
}

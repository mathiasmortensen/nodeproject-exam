import toastr from 'toastr';
import { navigate } from 'svelte5-router';
import { fetchDelete, fetchGet, fetchPost } from '../util/fetchHelper.js';
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

  const json = await resp.json();

  if (!resp.ok) {
    toastr.error(json.message);
    auth.user = null;
    auth.isAuthenticated = false;
    return;
  }

  await authMe();
  toastr.success(json.message);
  navigate('/profile', { replace: true });
}

export async function signup(email, username, password) {
  const resp = await fetchPost('/auth/signup', {
    email,
    username,
    password
  });

  const json = await resp.json();

  if (!resp.ok) {
    toastr.error(json.message);
    auth.user = null;
    auth.isAuthenticated = false;
    return;
  }

  await login(email, password);
  toastr.success('You have now signed up :)');
}

export async function logout() {
  const resp = await fetchPost('/auth/logout', {});

  const json = await resp.json();

  if (!resp.ok) {
    toastr.error(json.message);
    return;
  }

  auth.user = null;
  auth.isAuthenticated = false;
  navigate('/login', { replace: true });
  toastr.success(json.message);
}

export async function deleteAccount() {
  const resp = await fetchDelete('/auth/me');

  const json = await resp.json();

  if (!resp.ok) {
    toastr.error(json.message);
    return;
  }

  auth.user = null;
  auth.isAuthenticated = false;
  navigate('/', { replace: true });
  toastr.success('Your account has been deleted..');
}

export async function forgotPassword(email) {
  const resp = await fetchPost('/auth/forgot-password', {
    email
  });

  const json = await resp.json();

  if (!resp.ok) {
    toastr.error(json.message);
    return;
  }

  toastr.success(json.message);
}

export async function resetPassword(token, password) {
  const resp = await fetchPost('/auth/reset-password', { token, password });

  const json = await resp.json();

  if (!resp.ok) {
    toastr.error(json.message);
    return;
  }

  toastr.success(json.message);
  navigate('/login', { replace: true });
}

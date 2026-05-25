import toastr from 'toastr';
import { fetchGet, fetchDelete } from '../util/fetchHelper.js';

export async function getUsers() {
  const resp = await fetchGet('/admin/users');
  if (!resp.ok) {
    const error = await resp.json();
    toastr.error(error.message);
    return;
  }
  return await resp.json();
}

export async function deleteUser(userId) {
  const resp = await fetchDelete(`/admin/users/${userId}`);

  const json = await resp.json();

  if (!resp.ok) {
    toastr.error(json.message);
    return false;
  }

  toastr.success(json.message);
  return true;
}

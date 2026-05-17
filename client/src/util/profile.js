import { fetchPatch } from './fetchHelper.js';
import toastr from 'toastr';
import { auth } from '../stores/userStore.svelte.js';

export async function saveRiotProfile(riotId, region) {
  const resp = await fetchPatch('/profile/riot', {
    riotId,
    region
  });

  if (!resp || !resp.ok) {
    const error = await resp.json();
    toastr.error(error.message);
    return;
  }

  auth.user = await resp.json();
  toastr.success('Riot Profile Saved..');
  return true;
}

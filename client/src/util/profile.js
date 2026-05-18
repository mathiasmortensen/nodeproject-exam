import { fetchPatch } from './fetchHelper.js';
import toastr from 'toastr';
import { auth } from '../stores/userStore.svelte.js';

export async function saveRiotProfile(riotId, region) {
  if (!riotId.includes('#')) {
    toastr.error(`Riot id's must include hashtags (#) `);
    return;
  }

  const [riotName, tagLine] = riotId.split('#');
  if (!riotName || !tagLine) {
    toastr.error(`You must use a valid riot id... (example: fodsvamp#222)`);
  }
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

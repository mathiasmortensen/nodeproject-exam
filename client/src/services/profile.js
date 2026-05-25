import { fetchPatch } from '../util/fetchHelper.js';
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
    return;
  }

  const resp = await fetchPatch('/api/profile/riot', {
    riotId,
    region
  });

  const json = await resp.json();

  if (!resp.ok) {
    toastr.error(json.message);
    return;
  }

  auth.user = json;
  toastr.success('Riot Profile Saved..');
}

export function riotIdChecker(riotId, region) {
  if (!riotId.includes('#')) {
    toastr.error('Riot ID must contain #');
    return;
  }

  const [riotName, tagLine] = riotId.split('#');

  if (tagLine.length > 5 || tagLine.length < 3) {
    toastr.error('Riot taglines are between 3-5 characters');
    return;
  } else if (!riotName || !tagLine) {
    toastr.error('Riot ID is wrong. example: (fodsvamp#222)');
    return;
  }

  saveRiotProfile(riotId, region);
}

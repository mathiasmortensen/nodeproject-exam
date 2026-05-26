import toastr from 'toastr';
import { fetchDelete, fetchGet, fetchPost } from '../util/fetchHelper';

export async function getChampions() {
  const resp = await fetch('/ddragon/champion.json');

  const json = await resp.json();

  if (!resp.ok) {
    toastr.error(`An error occurred: ${resp.status} ${resp.statusText} `);
    return;
  }

  const champions = [];

  for (const champId in json.data) {
    const champ = json.data[champId];

    champions.push({ id: champ.id, name: champ.name, image: champ.image, tags: champ.tags });
  }

  return champions;
}

export async function getChampion(champName) {
  try {
    const resp = await fetch(`/ddragon/champion/${champName}.json`);

    const json = await resp.json();

    if (!resp.ok) {
      toastr.error(`An error occured: ${resp.status} ${resp.statusText}`);
      return;
    }
    return json.data[champName];
  } catch (error) {
    toastr.error(`An error occurred while trying to fetch ${champName} `);
  }
}

export async function postFavoriteChampion(championId) {
  try {
    const resp = await fetchPost('/api/favorites', {
      championId
    });

    const json = await resp.json();

    if (!resp.ok) {
      toastr.error(json.message);
      return false;
    }

    toastr.success(json.message);
    return true;
  } catch (error) {
    toastr.error('An error occurred while trying to favorite a champion..');
    return false;
  }
}

export async function removeFavoriteChampion(championId) {
  try {
    const resp = await fetchDelete(`/api/favorites/${championId}`);

    const json = await resp.json();

    if (!resp.ok) {
      toastr.error(json.message);
      return;
    }

    toastr.success(json.message);
    return;
  } catch (error) {
    toastr.error(`An error occurred while trying to DELETE ${championId} from favorites..`);
  }
}

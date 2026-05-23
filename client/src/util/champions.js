import toastr from 'toastr';
import { fetchDelete, fetchGet, fetchPost } from './fetchHelper';

export async function getChampions() {
  const resp = await fetch('/ddragon/champion.json');
  if (!resp.ok) {
    toastr.error(`An error occurred: ${resp.status} ${resp.statusText} `);
    return;
  }

  if (!resp) {
    toastr.error('An error occurred while trying to get champions..');
    return;
  }

  const champions = [];

  const json = await resp.json();

  for (const champId in json.data) {
    const champ = json.data[champId];

    champions.push({ id: champ.id, name: champ.name, image: champ.image, tags: champ.tags });
  }

  return champions;
}

export async function getChampion(champName) {
  try {
    const resp = await fetch(`/ddragon/champion/${champName}.json`);

    if (!resp) {
      toastr.error(`An error occurred while trying to fetch ${champName} `);
      return;
    }

    if (!resp.ok) {
      toastr.error(`An error occured: ${resp.status} ${resp.statusText}`);
      return;
    }
    const json = await resp.json();
    return json.data[champName];
  } catch (error) {
    toastr.error(`An error occurred while trying to fetch ${champName} `);
  }
}

export async function postFavoriteChampion(championId, championName) {
  try {
    const resp = await fetchPost('/api/favorites', {
      championId,
      championName
    });

    if (!resp) {
      toastr.error('An error occurred while trying to favorite a champion..');
      return;
    }

    if (!resp.ok) {
      const error = await resp.json();
      toastr.error(error.message);
      return;
    }

    const json = await resp.json();
    toastr.success(`${championName} added to favorites!!`);
    return;
  } catch (error) {
    toastr.error('An error occurred while trying to favorite a champion..');
    return;
  }
}

export async function removeFavoriteChampion(championId) {
  try {
    const resp = await fetchDelete(`/api/favorites/${championId}`);

    if (!resp) {
      toastr.error('An error occurred while trying to remove favorite...');
      return;
    }

    if (!resp.ok) {
      const error = await resp.json();
      toastr.error('An error occurred while trying to remove favorite champion..');
    }

    toastr.success('Champion removed from favorites!');
    return;
  } catch (error) {
    toastr.error(`An error occurred while trying to DELETE ${champName} from favorites..`);
  }
}

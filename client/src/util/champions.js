import toastr from 'toastr';
export async function getChampions() {
  const resp = await fetch('/ddragon/champion.json');
  if (!resp || !resp.ok) {
    const error = await resp.json();
    toastr.error(error.message);
  }
  const json = await resp.json();
  return Object.values(json.data);
}

export async function assignRoles(champions) {
  for (const champ of champions) {
    try {
      const resp = await fetch(`/ddragon/champion/${champ.id}.json`);
      if (!resp || !resp.ok) {
        console.log(`Could not get data for: ${champ.id}`);
        continue;
      }
      const json = await resp.json();
      champ.tags = json.data[champ.id].tags;
    } catch (error) {
      toastr.error(`Could not get data for: ${champ.id}`);
    }
  }

  return champions;
}

export async function getChampion(champName) {
  try {
    const resp = await fetch(`/ddragon/champion/${champName}.json`);

    if (!resp || !resp.ok) {
      toastr.error(`An error occured while trying to fetch ${champName} `);
      return;
    }
    const json = await resp.json();
    return json.data[champName];
  } catch (error) {
    toastr.error(`An error occured while trying to fetch ${champName} `);
  }
}

import toastr from 'toastr';

export async function getItems() {
  try {
    const resp = await fetch('/ddragon/item.json');

    if (!resp.ok) {
      toastr.error(`An error occurred: ${resp.status} ${resp.statusText}`);
      return;
    }

    const json = await resp.json();

    const items = [];

    for (const itemId in json.data) {
      const item = json.data[itemId];

      if (item.gold?.purchasable !== true || item.maps?.['11'] !== true) {
        continue;
      }

      items.push({ id: itemId, name: item.name, image: item.image.full, gold: item.gold.total });
    }
    return items;
  } catch (error) {
    toastr.error(`An error occurred while trying to load items.. `);
  }
}

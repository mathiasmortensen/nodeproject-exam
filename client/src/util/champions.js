import toastr from 'toastr';
export async function getChampions() {
  const resp = await fetch('/ddragon/champion.json');
  if (!resp || !resp.ok) {
    const error = resp.json();
    toastr.error(error.message);
  }
  const json = await resp.json();
  return Object.values(json.data);
}

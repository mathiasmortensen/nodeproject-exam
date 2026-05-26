<script>
  import { onMount } from 'svelte';
  import { getItems } from '../services/items.js';
  import { auth } from '../stores/userStore.svelte';
  import { getChampions } from '../services/champions.js';

  let items = $state([]);
  let champions = $state([]);

  let chosenItems = $state([]);
  let chosenChampion = $state();

  function getRandomIndex(length) {
    const randomValues = new Uint32Array(1);

    crypto.getRandomValues(randomValues);
    const randomNumber = randomValues[0];
    return randomNumber % length;
  }

  function getRandomChampion() {
    if (champions.length === 0) {
      return undefined;
    }

    const randomIndex = getRandomIndex(champions.length);
    const champion = champions[randomIndex];

    return champion;
  }

  function getSixRandomItems() {
    if (items.length === 0) {
      return [];
    }

    const randomItems = new Set();

    while(randomItems.size < 6){
      const randomIndex = getRandomIndex(items.length);
      const item = items[randomIndex];
      randomItems.add(item);
    }
    return [...randomItems];
  }

  onMount(async () => {
    items = await getItems();
    champions = await getChampions();
  });
</script>

<svelte:head><title>UpLoL | Bravery | Items</title></svelte:head>

<main class="min-h-screen bg-zinc-950 p-8 pt-16">
  <div class="max-w-lg mx-auto">
    <h1 class="mb-6 text-2xl text-amber-400">Bravery | Champs and Items</h1>

    <div class="flex gap-3">
      <button
        onclick={() => {
          chosenItems = getSixRandomItems();
          chosenChampion = undefined;
        }}
        class="bg-amber-400 text-zinc-950 px-4 py-2 text-sm hover:bg-amber-300 transition-colors">Items</button
      >
      <button
        onclick={() => {
          chosenChampion = getRandomChampion();
          chosenItems = [];
        }}
        class="bg-amber-400 text-zinc-950 px-4 py-2 text-sm hover:bg-amber-300 transition-colors">Champion</button
      >
      <button
        onclick={() => {
          chosenChampion = getRandomChampion();
          chosenItems = getSixRandomItems();
        }}
        class="bg-amber-400 text-zinc-950 px-4 py-2 text-sm hover:bg-amber-300 transition-colors">Champ + Items</button
      >
    </div>

    {#if chosenChampion || chosenItems.length > 0}
      <div class="mt-8 bg-zinc-900 border border-zinc-800 p-6 flex gap-6 items-start">
        {#if chosenChampion}
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${chosenChampion.id}_0.jpg`}
            alt={chosenChampion.name}
            class="w-28 h-28 border border-zinc-700"
          />
        {/if}

        {#if chosenItems.length > 0}
          <div class="grid grid-cols-3 gap-3">
            {#each chosenItems as item}
              <div class="flex flex-col items-center gap-1">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/16.10.1/img/item/${item.image}`}
                  alt={item.name}
                  class="w-12 h-12 border border-zinc-700"
                />
                <p class="text-xs text-zinc-400 text-center w-16 truncate">{item.name}</p>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</main>

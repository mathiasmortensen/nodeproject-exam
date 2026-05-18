<script>
  import { onMount } from 'svelte';
  import { getChampions } from '../util/champions.js';

  let champions = [];

  onMount(async () => {
    champions = await getChampions();
  });
</script>

<svelte:head>
  <title>Champions</title>
</svelte:head>

<h1>Champions</h1>

{#each champions as champ}
  <img src={`/ddragon/champion/${champ.image.full}`} alt={champ.name} />
{/each}

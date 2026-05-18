<script>
  import { onMount } from 'svelte';
  import { getChampions, assignRoles } from '../util/champions.js';
  import { Link } from 'svelte5-router';
  import { authMe } from '../util/auth.js';
  import { auth } from '../stores/userStore.svelte.js';

  let selectedTag = '';
  let champions = [];

  onMount(async () => {
    await authMe();
    if (auth.user) {
      champions = await getChampions();
      await assignRoles(champions);
    }
  });
</script>

<svelte:head>
  <title>Champions</title>
</svelte:head>

<div id="app">
  {#if auth.user}
    <h1>Champions</h1>
    <div class="tag-buttons">
      <button on:click={() => (selectedTag = 'Fighter')}>Fighter</button>
      <button on:click={() => (selectedTag = 'Tank')}>Tank</button>
      <button on:click={() => (selectedTag = 'Support')}>Support</button>
      <button on:click={() => (selectedTag = 'Mage')}>Mage</button>
      <button on:click={() => (selectedTag = 'Marksman')}>Marksman</button>
      <button on:click={() => (selectedTag = 'Assassin')}>Assassin</button>
    </div>
    <br />

    {#if selectedTag}
      <div class="champion-row">
        {#each champions.filter((champ) => champ.tags && champ.tags.includes(selectedTag)) as champ}
          <Link to={`/champions/${champ.id}`}>
            <div class="champion-card">
              <img src={`/ddragon/champion/${champ.image.full}`} alt={champ.name} />
              <p>{champ.name}</p>
            </div>
          </Link>
        {/each}
      </div>
    {:else}
      <p>Choose a tag to see champions!</p>
    {/if}
  {:else}
    <p>Loading...</p>
  {/if}
</div>

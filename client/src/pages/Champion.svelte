<script>
  import { onMount } from 'svelte';
  import { getChampion } from '../util/champions.js';
  import { Link } from 'svelte5-router';
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import { authMe } from '../util/auth.js';
  import { auth } from '../stores/userStore.svelte.js';

  export let champName;

  let champ = {};

  onMount(async () => {
    await authMe();
    if (auth.user) {
      champ = await getChampion(champName);
    }
  });
</script>

<div id="app">
  <Link to="/champions" style="margin-right:95%;">Back</Link>

  {#if auth.user}
    {#if champ && champ.image}
      <img src={`/ddragon/champion/${champ.image.full}`} alt={champ.name} />
      <h2>{champ.name}</h2>
      <h3>{champ.title}</h3>
      <p>{champ.blurb}</p>

      <h2>Abilities</h2>

      <div>
        <h3>Passive - {champ.passive.name}</h3>
        <p>{champ.passive.description}</p>
      </div>

      {#each champ.spells as spell, i}
        <div class="abilities">
          <h3>
            {#if i === 0}Q{/if}
            {#if i === 1}W{/if}
            {#if i === 2}E{/if}
            {#if i === 3}R{/if}
          </h3>
          <img src={`/ddragon/spell/${spell.image.full}`} alt={spell.name} />
          <p>{spell.description}</p>
        </div>
      {/each}
    {/if}
  {:else}
    <p>Loading...</p>
  {/if}
</div>

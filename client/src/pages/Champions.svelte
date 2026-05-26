<script>
  import { onMount } from 'svelte';
  import { getChampions } from '../services/champions.js';
  import { Link } from 'svelte5-router';
  import { auth } from '../stores/userStore.svelte.js';

  let selectedTag = $state('');
  let champions = $state([]);

  const roles = ['Fighter', 'Tank', 'Support', 'Mage', 'Marksman', 'Assassin', 'Favorites'];
  let favoriteChampions = $state([]);

  onMount(async () => {
    if (auth.user) {
      champions = await getChampions();
    }
  });

  $effect(async () => {
    if (auth.user && auth.user.favoriteChampions) {
      favoriteChampions = auth.user.favoriteChampions;
    }
  });
</script>

<svelte:head>
  <title>UpLoL | Champions</title>
</svelte:head>

<main class="p-8 mt-7 bg-zinc-950/80 min-h-screen">
  <h1 class="mb-6 text-2xl text-amber-400 text-center">Champions</h1>

  <div class="mb-8 flex flex-wrap gap-3 items-center justify-center">
    {#each roles as role}
      <button
        onclick={() => (selectedTag = selectedTag === role ? '' : role)}
        class="border p-3 w-24 h-24 cursor-pointer {selectedTag === role
          ? 'border-amber-400 bg-zinc-900 text-amber-400'
          : 'border-zinc-800 bg-zinc-950 text-zinc-400'}"
      >
        <img src={`/ddragon/roles/${role}.png`} alt={role} class="mx-auto mb-1 h-8 w-8" />
        <span class="text-sm">{role}</span>
      </button>
    {/each}
  </div>

  {#if selectedTag}
    <div class="flex flex-wrap gap-4 justify-center">
      {#each champions.filter((champ) => {
        if (selectedTag === 'Favorites') {
          return favoriteChampions.includes(champ.id);
        }
        return champ.tags.includes(selectedTag);
      }) as champ}
        <Link to={`/champions/${champ.id}`}>
          <div class="w-28 h-28 border border-zinc-800 bg-zinc-900 p-3 text-center text-zinc-100">
            <img src={`/ddragon/champion/${champ.image.full}`} alt={champ.name} class="mx-auto mb-2 h-12 w-12" />
            <p class="text-sm">{champ.name}</p>
          </div>
        </Link>
      {/each}
    </div>
  {:else}
    <p class="text-zinc-400 text-center">Choose a role to see champions!</p>
  {/if}
</main>

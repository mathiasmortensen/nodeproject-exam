<script>
  import { getChampion, postFavoriteChampion, removeFavoriteChampion } from '../services/champions.js';
  import { Link } from 'svelte5-router';
  import { auth } from '../stores/userStore.svelte.js';

  let { champId } = $props();

  let champ = $state({});
  let skinError = $state([]);
  let isFavorite = $state(false);

  $effect(async () => {
    if (auth.user) {
      champ = await getChampion(champId);
      isFavorite = auth.user.favoriteChampions.includes(champ.id) ?? false;
    }
  });
</script>

<main class="min-h-screen mt-7 bg-zinc-950 px-4 py-8 text-zinc-100">
  <div class="mx-auto max-w-5xl">
    <Link
      to="/champions"
      class="inline-flex items-center border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400 hover:text-amber-400"
    >
      Back
    </Link>

    <section class="mt-6 border border-zinc-800 bg-zinc-900 p-6">
      {#if auth.user}
        {#if champ && champ.image}
          <div class="mb-8 border-b border-zinc-800 pb-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-4xl text-zinc-100">
                  {champ.name}
                </h1>

                <h2 class="mt-1 text-lg text-amber-400">
                  {champ.title}
                </h2>
              </div>

              <button
                onclick={async (e) => {
                  e.preventDefault();
                  if (!isFavorite) {
                    await postFavoriteChampion(champ.id, champ.name);
                    auth.user.favoriteChampions.push(champ.id);
                    isFavorite = true;
                  } else {
                    await removeFavoriteChampion(champ.id);
                    auth.user.favoriteChampions = auth.user.favoriteChampions.filter((id) => id !== champ.id);
                    isFavorite = false;
                  }
                }}>{isFavorite ? '❌' : '⭐'}</button
              >

              <img src={`/ddragon/champion/${champ.image.full}`} alt={champ.name} class="h-32 w-32" />
            </div>

            <p class="mt-4 max-w-3xl text-zinc-400">
              {champ.blurb}
            </p>
          </div>

          <div class="mb-10">
            <h2 class="mb-4 text-2xl text-zinc-100">Abilities</h2>

            <div class="border border-zinc-800 bg-zinc-950 p-4">
              <div class="flex items-start gap-4">
                <img
                  src={`/ddragon/passive/${champ.passive.image.full}`}
                  alt={champ.passive.name}
                  class="h-12 w-12 border border-zinc-800"
                />

                <div>
                  <p class="text-sm text-amber-400">P</p>

                  <h3 class="text-zinc-100">
                    {champ.passive.name}
                  </h3>

                  <p class="mt-2 text-sm text-zinc-400">
                    {@html champ.passive.description}
                  </p>
                </div>
              </div>
            </div>

            {#each champ.spells as spell, i}
              <div class="border border-zinc-800 bg-zinc-950 p-4 mt-4">
                <div class="flex items-start gap-4">
                  <img
                    src={`/ddragon/spell/${spell.image.full}`}
                    alt={spell.name}
                    class="h-12 w-12 border border-zinc-800"
                  />

                  <div>
                    <p class="text-sm text-amber-400">
                      {['Q', 'W', 'E', 'R'][i]}
                    </p>

                    <h3 class="text-zinc-100">
                      {spell.name}
                    </h3>

                    <p class="mt-2 text-sm text-zinc-400">
                      {@html spell.description}
                    </p>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <div>
            <h2 class="mb-4 text-2xl text-zinc-100">Skins</h2>

            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {#each champ.skins.filter((skin) => !('parentSkin' in skin)) as skin, i}
                {#if !skinError[i]}
                  <div class="group overflow-hidden border border-zinc-800 bg-zinc-950">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_${skin.num}.jpg`}
                      alt={skin.name}
                      class="w-full h-auto"
                      height="308"
                      width="560"
                      onerror={() => {
                        skinError[i] = true;
                      }}
                      style={skinError[i] ? 'display:none' : ''}
                    />

                    <div class="p-3">
                      <p class="text-center text-sm text-zinc-100">
                        {skin.name}
                      </p>
                    </div>
                  </div>
                {/if}
              {/each}
            </div>
          </div>
          <div class="mt-8 text-center">
            <p class="text-zinc-100">
              For more information on the {champ.name} champion
            </p>
            <a
              class="text-amber-400 hover:text-amber-500"
              href={`https://wiki.leagueoflegends.com/en-us/${champ.name}`}
              alt="League of Legends Wiki">League of Legends Wiki: {champ.name}</a
            >
          </div>
        {/if}
      {/if}
    </section>
  </div>
</main>

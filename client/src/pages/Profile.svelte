<script>
  import { auth } from '../stores/userStore.svelte.js';
  import { riotIdChecker, saveRiotProfile } from '../services/profile.js';
  import { deleteAccount, logout } from '../services/auth.js';
  import toastr from 'toastr';

  let riotId = $state();
  let region = $state();
  let formView = $state('Edit');
  let trulyDelete = $state(false);

  $effect(async () => {
    if (auth.user) {
      riotId = auth.user.riot_id ?? '';
      region = auth.user.riot_region ?? 'euw1';
      formView = auth.user.riot_id ? 'Saved' : 'Edit';
    }
  });
</script>

<svelte:head><title>Profile</title></svelte:head>

<div class="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
  <div class="bg-zinc-900 border border-zinc-800 h-3/5 w-3/12 p-8 flex flex-col gap-4">
    <h1 class="text-2xl text-amber-400">Profile</h1>

    {#if auth.user}
      <p class="text-sm text-zinc-400">Username: <span class="text-zinc-100">{auth.user.username}</span></p>
      <p class="text-sm text-zinc-400">Email: <span class="text-zinc-100">{auth.user.email}</span></p>

      <hr class="border-zinc-800" />

      {#if formView === 'Saved'}
        <h2 class="text-lg text-zinc-100">Riot Profile</h2>
        <p class="text-sm text-zinc-400">Riot ID: <span class="text-zinc-100">{riotId}</span></p>
        <p class="text-sm text-zinc-400">Region: <span class="text-zinc-100">{region}</span></p>
        <button
          onclick={() => (formView = 'Edit')}
          class="bg-amber-400 text-zinc-950 py-2 text-sm hover:cursor-pointer"
        >
          Change
        </button>
      {:else if formView === 'Edit'}
        <form
          onsubmit={async (e) => {
            e.preventDefault();

            const success = await riotIdChecker(riotId, region);

            if (!success) {
              return;
            }

            formView = 'Saved';
          }}
          class="flex flex-col gap-4"
        >
          <h2 class="text-lg text-zinc-100">Riot Profile</h2>
          <input
            type="text"
            placeholder="example#euw"
            bind:value={riotId}
            required
            class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm"
          />
          <select bind:value={region} class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm">
            <option value="euw1">EUW</option>
            <option value="eun1">EUNE</option>
            <option value="na1">NA</option>
            <option value="kr">KR</option>
            <option value="jp1">JP</option>
          </select>
          <button type="submit" class="bg-amber-400 text-zinc-950 py-2 text-sm hover:cursor-pointer">
            Save Riot Profile
          </button>
        </form>
      {/if}

      <button
        type="button"
        class="text-sm border border-zinc-700 text-zinc-300 py-2 hover:cursor-pointer hover:text-amber-400"
        onclick={async () => {}}
      >
        Change Password
      </button>

      <button
        type="button"
        class="text-sm border border-zinc-700 text-zinc-300 py-2 hover:cursor-pointer hover:text-amber-400"
        onclick={async () => {
          await logout();
        }}
      >
        Logout
      </button>

      {#if !trulyDelete}
        <button
          class="text-sm bg-amber-400 hover:cursor-pointer py-2"
          onclick={(e) => {
            trulyDelete = true;
          }}>Delete Account</button
        >
      {:else}
        <button
          class="border border-zinc-700 py-2 bg-zinc-950 text-red-400 hover:text-red-600 cursor-pointer"
          onclick={async (e) => {
            await deleteAccount();
          }}>I truly want to delete my account</button
        >

        <button
          class="border border-zinc-700 text-zinc-300 py-2 hover:cursor-pointer"
          onclick={(e) => {
            trulyDelete = false;
          }}>Cancel</button
        >
      {/if}
    {/if}
  </div>
</div>

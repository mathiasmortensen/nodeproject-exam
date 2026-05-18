<script>
  import { auth } from '../stores/userStore.svelte.js';
  import { saveRiotProfile } from '../util/profile.js';
  import { authMe } from '../util/auth.js';
  import { onMount } from 'svelte';
  import toastr from 'toastr';

  let riotId = $state();
  let region = $state();
  let formView = $state('Edit');

  onMount(async () => {
    await authMe();
  });

  $effect(async () => {
    if (auth.user) {
      riotId = auth.user.riot_id ?? '';
      region = auth.user.riot_region ?? 'euw1';
      formView = auth.user.riot_id ? 'Saved' : 'Edit';
    }
  });
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>
<div id="app">
  <h1>Profile</h1>

  {#if auth.user}
    <p>Username: {auth.user.username}</p>
    <p>Email: {auth.user.email}</p>

    {#if formView === 'Saved'}
      <h2>Riot Profile</h2>
      <p>Riot ID: {riotId}</p>
      <p>Region: {region}</p>

      <button class="btn" onclick={() => (formView = 'Edit')}>Change </button>
    {/if}

    {#if formView === 'Edit'}
      <form
        onsubmit={(event) => {
          event.preventDefault();
          const [riotName, tagLine] = riotId.split('#');

          if (!riotName || !tagLine) {
            toastr.error('Riot ID is wrong. example: (fodsvamp#222)');
            return;
          }

          if (!riotId.includes('#')) {
            toastr.error('Riot ID must contain #');
            return;
          }
          saveRiotProfile(riotId, region);
          formView = 'Saved';
        }}
      >
        <input type="text" placeholder="example#euw" bind:value={riotId} required />

        <select bind:value={region}>
          <option value="euw1">EUW</option>
          <option value="eun1">EUNE</option>
          <option value="na1">NA</option>
          <option value="kr">KR</option>
          <option value="jp1">JP</option>
        </select>
        <button type="submit">Save Riot Profile</button>
      </form>
    {/if}
  {:else}
    <p>You're not logged in...</p>
  {/if}
</div>

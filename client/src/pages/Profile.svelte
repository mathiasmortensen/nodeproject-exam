<script>
  import { auth } from '../stores/userStore.svelte.js';
  import { saveRiotProfile } from '../util/profile.js';

  let riotId = $state(auth.user.riot_id ?? '');
  let region = $state(auth.user.riot_region ?? 'euw1');

  let formView = $state(auth.user.riot_id ? 'Saved' : 'Edit');
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>
<div class="wrapper-page">
  <div class="inner-page">
    <h1>Profile</h1>

    {#if auth.user}
      <p>Username: {auth.user.username}</p>
      <p>Email: {auth.user.email}</p>

      {#if formView === 'Saved'}
        <h2>Riot Profile</h2>
        <p>Riot ID: {auth.user.riot_id}</p>
        <p>Region: {auth.user.riot_region}</p>

        <button class="btn" onclick={() => (formView = 'Edit')}>Change </button>
      {/if}

      {#if formView === 'Edit'}
        <form
          onsubmit={(event) => {
            event.preventDefault();
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
</div>

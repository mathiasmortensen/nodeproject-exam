<script>
  import { onMount } from 'svelte';
  import { getUsers } from '../util/auth.js';
  import { deleteUser } from '../util/auth.js';

  let users = $state([]);
  let trulyDelete = $state(false);

  onMount(async () => {
    users = await getUsers();
  });
</script>

<svelte:head>Admin Dashboard</svelte:head>
<main class="p-7 mt-7 bg-zinc-950 min-h-screen">
  <div class="max-w-4xl mx-auto">
    <h1 class="mb-6 text-2xl text-amber-400 text-center">Admin Dashboard</h1>

    <div class="bg-zinc-900 border border-zinc-800">
      <table class="w-full text-left">
        <thead>
          <tr>
            <th class="p-4 text-sm">ID</th>
            <th class="p-4 text-sm">Username</th>
            <th class="p-4 text-sm">Email</th>
            <th class="p-4 text-sm">Riot ID</th>
            <th class="p-4 text-sm">Riot Region</th>
            <th class="p-4 text-sm">Type</th>
            <th class="p-4 text-sm">Actions</th>
          </tr>
        </thead>

        <tbody>
          {#each users as user}
            <tr class="border-b border-zinc-800">
              <td class="p-4 text-sm text-zinc-400">{user.id}</td>
              <td class="p-4 text-sm text-zinc-400">{user.username}</td>
              <td class="p-4 text-sm text-zinc-400">{user.email}</td>
              <td class="p-4 text-sm text-zinc-400">{user.riot_id}</td>
              <td class="p-4 text-sm text-zinc-400">{user.riot_region}</td>

              <td class="p-4 text-sm text-zinc-400">
                {#if user.is_admin}
                  Admin
                {:else}
                  Admin
                {/if}
              </td>
              {#if trulyDelete === false}
                <td class="p-4 text-sm text-red-200">
                  <button
                    class=" bg-red-400"
                    onclick={(e) => {
                      trulyDelete = true;
                    }}>Delete</button
                  >
                </td>
              {/if}
              {#if trulyDelete === true}
                <td class="p-4 text-sm text-200">
                  <button
                    class="bg-red-600"
                    onclick={async (e) => {
                      await deleteUser(user.id);
                    }}>Delete User</button
                  ></td
                >
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</main>

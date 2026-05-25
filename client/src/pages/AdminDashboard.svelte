<script>
  import { onMount } from 'svelte';
  import { getUsers } from '../services/admin.js';
  import { deleteUser } from '../services/admin.js';

  let users = $state([]);
  let deleteUserId = $state(null);

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
            <th class="p-4 text-sm text-amber-400">ID</th>
            <th class="p-4 text-sm text-amber-400">Username</th>
            <th class="p-4 text-sm text-amber-400">Email</th>
            <th class="p-4 text-sm text-amber-400">Riot ID</th>
            <th class="p-4 text-sm text-amber-400">Riot Region</th>
            <th class="p-4 text-sm text-amber-400">Type</th>
            <th class="p-4 text-sm text-amber-400">Actions</th>
          </tr>
        </thead>

        <tbody>
          {#each users as user, index}
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
                  User
                {/if}
              </td>
              {#if deleteUserId !== user.id}
                <td class="p-4 text-sm align-middle">
                  <button
                    class="bg-amber-400 text-zinc-950 px-3 py-2 rounded hover:cursor-pointer"
                    onclick={() => {
                      deleteUserId = user.id;
                    }}
                  >
                    Delete
                  </button>
                </td>
              {:else}
                <td class="p-4 text-sm align-middle">
                  <div class="flex items-center gap-2 whitespace-nowrap">
                    <button
                      class="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer"
                      onclick={async () => {
                        const deleted = await deleteUser(user.id);
                        if (deleted) {
                          users.splice(index, 1);
                          deleteUserId = null;
                        }
                      }}
                    >
                      Confirm
                    </button>

                    <button
                      class="text-sm text-zinc-400 hover:text-zinc-200 hover:cursor-pointer"
                      onclick={() => {
                        deleteUserId = null;
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</main>

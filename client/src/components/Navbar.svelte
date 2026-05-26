<script>
  import { auth } from '../stores/userStore.svelte.js';
  import { logout } from '../services/auth.js';
  import OnlineUsers from './OnlineUsers.svelte';
  import { navigate } from 'svelte5-router';
  import Menu from 'lucide-svelte/icons/menu';

  let openMenu = $state(false);
</script>

<nav class="fixed top-0 left-0 right-0 bg-zinc-950 border-b border-zinc-800 px-6 py-3 flex items-center gap-6 z-10">
  <a href="/"><img src="/icon.png" alt="UpLoL Icon" class=" w-8 h-8" /></a>
  <a href="/champions" class="text-sm text-zinc-100 hover:text-amber-400">Champions</a>
  <a href="/bravery" class="text-sm text-zinc-100 hover:text-amber-400">Bravery</a>
  {#if auth.user?.is_admin}
    <a href="/admin" class="text-sm text-zinc-100 hover:text-amber-400">Admin Dashboard</a>
  {/if}

  <div class="ml-auto flex items-center gap-6">
    <OnlineUsers />

    {#if auth.user}
      <div class="relative">
        <button
          class="flex items-center gap-1 text-sm text-zinc-100 hover:text-amber-400 cursor-pointer"
          onclick={(e) => {
            e.preventDefault();
            openMenu = !openMenu;
          }}
          ><Menu class="w-6 h-6" />
        </button>

        {#if openMenu}
          <div
            class="absolute right-0 mt-2 w-40 bg-zinc-800 border border-zinc-700 rounded shadow-lg flex flex-col py-1"
          >
            <a href="/profile" class="px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-700 hover:text-amber-400">Profile</a
            >
            <button
              class="px-4 py-2 text-sm text-left text-zinc-100 hover:bg-zinc-700 hover:text-amber-400 hover:cursor-pointer"
              onclick={logout}
            >
              Logout
            </button>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</nav>

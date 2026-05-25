<script>
  import { auth } from '../stores/userStore.svelte.js';
  import { logout } from '../services/auth.js';
  import OnlineUsers from './OnlineUsers.svelte';
  import { navigate } from 'svelte5-router';
</script>

{#if auth.isAuthenticated}
  <nav class="fixed top-0 left-0 right-0 bg-zinc-950 border-b border-zinc-800 px-6 py-3 flex items-center gap-6 z-10">
    <a href="/"><img src="/icon.png" alt="UpLoL Icon" class=" w-8 h-8" /></a>
    <a href="/profile" class="text-sm text-zinc-100 hover:text-amber-400">Profile</a>
    <a href="/champions" class="text-sm text-zinc-100 hover:text-amber-400">Champions</a>
    {#if auth.user.is_admin}
      <a href="/admin" class="text-sm text-zinc-100 hover:text-amber-400">Admin Dashboard</a>
    {/if}

    <div class="ml-auto flex items-center gap-6">
      <OnlineUsers />

      <a
        href="/"
        onclick={(e) => {
          e.preventDefault();
          logout();
        }}
        class="text-sm text-zinc-400 hover:text-amber-400"
      >
        Logout
      </a>
    </div>
  </nav>
{/if}

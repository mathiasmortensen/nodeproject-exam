<script>
  import { navigate } from 'svelte5-router';
  import { signup, login } from '../services/auth.js';
  import toastr from 'toastr';
  import { onMount } from 'svelte';
  import { auth } from '../stores/userStore.svelte.js';

  let identifier = $state('');
  let username = $state('');
  let email = $state('');
  let password = $state('');
  let view = $state(window.location.pathname === '/signup' ? 'Signup' : 'Login');

  onMount(async () => {
    if (auth.user) {
      navigate('/profile', { replace: true });
    }
  });
</script>

<svelte:head>
  <title>UpLoL | {view}</title>
</svelte:head>

<div class="min-h-screen bg-zinc-950/80 flex items-center justify-center">
  <div class="bg-zinc-900 border border-zinc-800 p-8 w-full max-w-sm">
    <button onclick={() => navigate('/')} class="text-sm text-zinc-400 hover:text-amber-400 mb-6 block cursor-pointer">
      Back to home
    </button>

    {#if view === 'Signup'}
      <form
        onsubmit={(e) => {
          e.preventDefault();
          signup(email, username, password);
        }}
        class="flex flex-col gap-4"
      >
        <h1 class="text-2xl text-amber-400">Sign up</h1>

        <input
          type="email"
          placeholder="Email"
          bind:value={email}
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:border-amber-400 outline-none"
        />

        <input
          type="text"
          placeholder="Username"
          bind:value={username}
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:border-amber-400 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          bind:value={password}
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:border-amber-400 outline-none"
        />

        <button type="submit" class="bg-amber-400 text-zinc-950 py-2 text-sm cursor-pointer"> Sign up </button>
      </form>

      <p class="text-sm text-zinc-400 text-center mt-4">
        Already have an account?
        <button onclick={() => (view = 'Login')} class="text-amber-400 text-sm cursor-pointer">Log in</button>
      </p>
    {:else if view === 'Login'}
      <form
        onsubmit={(e) => {
          e.preventDefault();
          login(identifier, password);
        }}
        class="flex flex-col gap-4"
      >
        <h1 class="text-2xl text-amber-400">Login</h1>

        <input
          type="text"
          placeholder="Username or Email"
          bind:value={identifier}
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:border-amber-400 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          bind:value={password}
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:border-amber-400 outline-none"
        />

        <button type="submit" class="bg-amber-400 text-zinc-950 py-2 text-sm cursor-pointer"> Log in </button>
      </form>

      <p class="text-sm text-zinc-400 text-center mt-4">
        Cant remember your password?
        <button
          onclick={() => navigate('/forgot-password', { replace: true })}
          class="text-amber-400 text-sm cursor-pointer">Forgot Password</button
        >
      </p>

      <p class="text-sm text-zinc-400 text-center mt-4">
        Need an account?
        <button onclick={() => (view = 'Signup')} class="text-amber-400 text-sm cursor-pointer">Sign up</button>
      </p>
    {/if}
  </div>
</div>

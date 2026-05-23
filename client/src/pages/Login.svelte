<script>
  import { navigate } from 'svelte5-router';
  import { signup, login } from '../util/auth.js';
  import toastr from 'toastr';

  let identifier = $state('');
  let username = $state('');
  let email = $state('');
  let password = $state('');
  let view = $state(window.location.pathname === '/signup' ? 'Signup' : 'Login');
</script>

<svelte:head>
  <title>{view}</title>
</svelte:head>

<div class="min-h-screen bg-zinc-950 flex items-center justify-center">
  <div class="bg-zinc-900 border border-zinc-800 p-8 w-full max-w-sm">
    <button
      onclick={() => navigate('/')}
      class="text-sm text-zinc-400 hover:text-amber-400 mb-6 block hover:cursor-pointer"
    >
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
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:outline-none"
        />

        <input
          type="text"
          placeholder="Username"
          bind:value={username}
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          bind:value={password}
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:outline-none"
        />

        <button onclick={(e) => {}} type="submit" class="bg-amber-400 text-zinc-950 py-2 text-sm hover:cursor-pointer"> Sign up </button>
      </form>

      <p class="text-sm text-zinc-400 text-center mt-4">
        Already have an account?
        <button onclick={() => (view = 'Login')} class="text-amber-400 text-sm hover:cursor-pointer">Log in</button>
      </p>
    {/if}

    {#if view === 'Login'}
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
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          bind:value={password}
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:outline-none"
        />

        <button type="submit" class="bg-amber-400 text-zinc-950 py-2 text-sm hover:cursor-pointer"> Log in </button>
      </form>

      <p class="text-sm text-zinc-400 text-center mt-4">
        Not a user yet?
        <button onclick={() => (view = 'Signup')} class="text-amber-400 text-sm hover:cursor-pointer">Sign up</button>
      </p>
    {/if}
  </div>
</div>

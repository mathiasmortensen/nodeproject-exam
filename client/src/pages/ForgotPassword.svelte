<script>
  import { navigate } from 'svelte5-router';
  import { forgotPassword } from '../services/auth.js';

  let email = $state();
</script>

<svelte:head><title>UpLoL | Forgot Password</title></svelte:head>

<main class="min-h-screen bg-zinc-950/80 flex items-center justify-center">
  <div class="bg-zinc-900 border border-zinc-800 p-8 w-full max-w-sm">
    <button onclick={() => navigate('/')} class="text-sm text-zinc-400 hover:text-amber-400 mb-6 block cursor-pointer">
      Back to home
    </button>

    <form
      onsubmit={() => {
        forgotPassword(email);
      }}
      class="flex flex-col gap-4"
    >
      <h1 class="text-2xl text-amber-400">Forgot Password</h1>

      <input
        type="email"
        placeholder="Email"
        bind:value={email}
        class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:border-amber-400 outline-none"
      />

      <button type="submit" class="bg-amber-400 text-zinc-950 py-2 text-sm cursor-pointer"> Forgot Password </button>
    </form>
  </div>
</main>

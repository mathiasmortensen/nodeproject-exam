<script>
  import { navigate } from 'svelte5-router';
</script>

<div class="min-h-screen bg-zinc-950 flex items-center justify-center p-8">
  <section class="max-w-2xl text-center bg-zinc-900 border border-zinc-800 p-10">
    <h1 class="text-4xl text-amber-400 mb-5">League of Legends</h1>

    <p class="text-zinc-400 text-lg mb-8">
      View all the champions in League of Legends and add your Riot ID to your profile!
    </p>

    <div class="flex gap-4 justify-center">
      <button onclick={() => navigate('/login')} class="bg-amber-400 text-zinc-950 px-6 py-3 font-medium">Login</button>
      <button
        onclick={() => navigate('/signup')}
        class="bg-zinc-800 text-zinc-100 border border-zinc-800 px-6 py-3 hover:bg-zinc-700">Sign up</button
      >
    </div>
  </section>
</div>

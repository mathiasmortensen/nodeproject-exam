<script>
  import { navigate } from 'svelte5-router';
</script>

<div id="app">
  <section class="home">
    <h1>League of Legends Profile Tracker</h1>

    <p>
      Search for League of Legends accounts, save your own account on your profile, or add champions to your favorites
    </p>

    <div class="actions">
      <button onclick={() => navigate('/login')}>Login</button>
      <button onclick={() => navigate('/signup')}>Sign up</button>
    </div>
  </section>
</div>

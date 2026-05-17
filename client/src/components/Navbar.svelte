<script>
  import { auth } from '../stores/userStore.svelte.js';
  import { logout } from '../util/auth.js';
</script>

{#if auth.isAuthenticated}
  <nav class="wrapper">
    <div class="inner-wrapper">
      <a href="/profile">Profile</a>
      <a href="/champions">Champions</a>
      <a
        class="logoutLink"
        onclick={(event) => {
          event.preventDefault();
          logout();
        }}
        aria-label="logout button"
        href="/"
      >
        Logout</a
      >
    </div>
  </nav>
{/if}

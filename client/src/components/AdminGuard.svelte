<script>
  import { auth } from '../stores/userStore.svelte.js';
  import { navigate } from 'svelte5-router';
  import { onMount } from 'svelte';
  import { authMe } from '../util/auth.js';

  let { children } = $props();

  onMount(async () => {
    if (!auth.isAuthenticated) {
      await authMe();
    }

    if (!auth.user || !auth.user.is_admin) {
      navigate('/login', { replace: true });
    }
  });
</script>

{#if auth.user && auth.user.is_admin}
  {@render children()}
{/if}

<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte5-router';
  import { auth } from '../stores/userStore.svelte';
  import { authMe } from '../services/auth.js';

  let { children } = $props();

  onMount(async () => {
    if (!auth.isAuthenticated) {
      await authMe();
    }

    if (!auth.isAuthenticated) {
      navigate('/login', { replace: true });
    }
  });
</script>

{#if auth.isAuthenticated}
  {@render children()}
{/if}

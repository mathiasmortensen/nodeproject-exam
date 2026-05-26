<script>
  import { navigate } from 'svelte5-router';
  import { auth } from '../stores/userStore.svelte.js';

  let { children } = $props();

  $effect(() => {
    if (!auth.loading && !auth.isAuthenticated) {
      navigate('/login', { replace: true });
    }
  });
</script>

{#if auth.isAuthenticated}
  {@render children()}
{/if}

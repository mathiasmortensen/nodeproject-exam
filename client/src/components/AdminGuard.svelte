<script>
  import { auth } from '../stores/userStore.svelte.js';
  import { navigate } from 'svelte5-router';
  import toastr from 'toastr';

  let { children } = $props();
  $effect(() => {
    if (!auth.loading && auth.user && !auth.user.is_admin) {
      navigate('/profile', { replace: true });
      toastr.error('You do not have permission to go here...');
    }
  });
</script>

{#if auth.user && auth.user.is_admin}
  {@render children()}
{/if}

<script>
  import { auth } from '../stores/userStore.svelte.js';
  import { authMe } from '../services/auth.js';
  import { navigate } from 'svelte5-router';
  import { onMount } from 'svelte';
  import toastr from 'toastr';

  let { children } = $props();

  onMount(async () => {
    if (!auth.user) {
      await authMe();
    } else if (!auth.user.is_admin) {
      navigate('/profile', { replace: true });
      toastr.error('You do not have permission for this site...');
    }
  });
</script>

{#if auth.user && auth.user.is_admin}
  {@render children()}
{/if}

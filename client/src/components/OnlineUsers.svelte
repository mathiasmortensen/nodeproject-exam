<script>
  import { onMount, onDestroy } from 'svelte';
  import { io } from 'socket.io-client';

  let onlineCount = $state(0);
  let socket;

  onMount(() => {
    const backendUrl = import.meta.env.VITE_BASE_URL;
    socket = io(backendUrl);

    socket.on('online-count', (count) => {
      onlineCount = count;
    });
  });

  onDestroy(() => {
    if (socket) {
      socket.disconnect();
    }
  });
</script>

<div class="flex items-center gap-2 text-sm text-zinc-400 border border-zinc-800 bg-zinc-900 px-3 py-1">
  <span class="text-amber-400">●</span>
  <span>{onlineCount} {onlineCount === 1 ? 'user' : 'users'} online</span>
</div>

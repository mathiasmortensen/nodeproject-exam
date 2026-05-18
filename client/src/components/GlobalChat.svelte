<script>
  import { onMount } from 'svelte';
  import io from 'socket.io-client';

  import { auth } from '../stores/userStore.svelte.js';

  let socket;
  let message = '';
  let messages = [];

  onMount(() => {
    socket = io(import.meta.env.VITE_BASE_URL, {
      withCredentials: true
    });

    socket.on('connect', () => {
      console.log('socket connected: ', socket.id);
    });

    socket.on('receive-message', handleReceiveMessage);

    socket.on('disconnect', () => {
      console.log('socket disconnected: ', socket.id);
    });
  });

  function handleReceiveMessage(msg) {
    messages = [...messages, msg];
  }

  function sendMessage(event) {
    event.preventDefault();

    const text = message.trim();

    if (!text) {
      return;
    }

    socket.emit('send-message', {
      text,
      username: auth.user.username
    });

    message = '';
  }
</script>

<h2>Global Chat</h2>

<div>
  {#each messages as msg}
    <div>
      <strong>{msg.username}</strong>
      <span>{msg.time}</span>
      <p>{msg.text}</p>
    </div>
  {/each}
</div>

<form on:submit={sendMessage}>
  <input bind:value={message} placeholder="Write a message here..." />
  <button type="submit">Send</button>
</form>

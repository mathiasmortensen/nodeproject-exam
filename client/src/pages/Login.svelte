<script>
  import { navigate } from 'svelte5-router';
  import { signup, login, authMe } from '../util/auth.js';
  import { auth } from '../stores/userStore.svelte.js';

  let identifier = $state('');
  let username = $state('');
  let email = $state('');
  let password = $state('');

  let view = $state(window.location.pathname === '/signup' ? 'Signup' : 'Login');
</script>

<svelte:head>
  <title>
    {view}
  </title>
</svelte:head>
<div class="page-wrapper">
  <button class="back" onclick={() => navigate('/')}>Back to home </button>
  {#if view === 'Signup'}
    <div class="page-inner">
      <form
        onsubmit={(e) => {
          e.preventDefault();
          signup(email, username, password);
        }}
      >
        <h1>Signup</h1>
        <input type="email" placeholder="Email" bind:value={email} />
        <input type="text" placeholder="Username" bind:value={username} />
        <input type="password" placeholder="Password" bind:value={password} />
        <button type="submit" class="btn">Sign up</button>
      </form>
    </div>

    <button class="btn" onclick={() => (view = 'Login')}>To Login </button>
  {/if}

  {#if view === 'Login'}
    <form
      onsubmit={(e) => {
        e.preventDefault();
        login(identifier, password);
      }}
    >
      <h1>Login</h1>
      <input type="text" placeholder="Username or Email" bind:value={identifier} />
      <input type="password" placeholder="Password" bind:value={password} />
      <button type="submit" class="btn">Log in</button>
    </form>
    <button class="btn" onclick={() => (view = 'Signup')}>To Signup</button>
  {/if}
</div>

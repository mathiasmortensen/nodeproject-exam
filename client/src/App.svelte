<script>
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Login from './pages/Login.svelte';
  import Home from './pages/Home.svelte';
  import { auth } from './stores/userStore.svelte';
  import { navigate, Router, Route } from 'svelte5-router';
  import Profile from './pages/Profile.svelte';
  import Champions from './pages/Champions.svelte';
  import Champion from './pages/Champion.svelte';
  import GlobalChat from './components/GlobalChat.svelte';
</script>

<div class="app">
  {#if auth.isAuthenticated}
    <Navbar />
    <GlobalChat />
  {/if}

  <main class="page-content">
    <Router>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/champions" component={Champions} />
      <Route path="/champions/:champName" component={Champion} />
    </Router>
  </main>
  <Footer />
</div>

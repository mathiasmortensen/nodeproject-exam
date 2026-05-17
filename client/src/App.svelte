<script>
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Login from './pages/Login.svelte';
  import Home from './pages/Home.svelte';
  import { auth } from './stores/userStore.svelte';
  import { navigate, Router, Route } from 'svelte5-router';
  import Profile from './pages/Profile.svelte';
</script>

{#if auth.isAuthenticated}
  <Navbar />
{/if}

<main class="page-content">
  <Router>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Login} />
    <Route path="/profile" component={Profile} />
  </Router>
</main>

{#if auth.isAuthenticated}
  <Footer />
{/if}

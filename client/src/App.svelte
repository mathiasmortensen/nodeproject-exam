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
  import AuthGuard from './components/AuthGuard.svelte';
  import AdminDashboard from './pages/AdminDashboard.svelte';
  import AdminGuard from './components/AdminGuard.svelte';
  import { onMount } from 'svelte';
  import { authMe } from './util/auth';

  onMount(async () => {
    await authMe();
  });
</script>

{#if auth.isAuthenticated}
  <Navbar />
{/if}

<Router>
  <Route path="/" component={Home} />

  <Route path="/login" component={Login} />

  <Route path="/signup" component={Login} />

  <Route path="/admin">
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  </Route>

  <Route path="/profile">
    <AuthGuard>
      <Profile />
    </AuthGuard>
  </Route>

  <Route path="/champions">
    <AuthGuard>
      <Champions />
    </AuthGuard>
  </Route>

  <Route path="/champions/:champId">
    {#snippet children(params)}
      <AuthGuard>
        <Champion champId={params.champId} />
      </AuthGuard>
    {/snippet}
  </Route>
</Router>
<Footer />

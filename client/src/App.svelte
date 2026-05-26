<script>
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Login from './pages/Login.svelte';
  import Home from './pages/Home.svelte';
  import { auth } from './stores/userStore.svelte';
  import { Router, Route } from 'svelte5-router';
  import Profile from './pages/Profile.svelte';
  import Champions from './pages/Champions.svelte';
  import Champion from './pages/Champion.svelte';
  import AuthGuard from './components/AuthGuard.svelte';
  import AdminDashboard from './pages/AdminDashboard.svelte';
  import AdminGuard from './components/AdminGuard.svelte';
  import { onMount } from 'svelte';
  import { authMe } from './services/auth.js';
  import ForgotPassword from './pages/ForgotPassword.svelte';
  import ResetPassword from './pages/ResetPassword.svelte';
  import Bravery from './pages/Bravery.svelte';
  import Privacy from './pages/Privacy.svelte';

  onMount(async () => {
    await authMe();
  });
</script>

<Navbar />

<Router>
  <Route path="/" component={Home} />

  <Route path="/login" component={Login} />

  <Route path="/signup" component={Login} />

  <Route path="/admin">
    <AuthGuard>
      <AdminGuard>
        <AdminDashboard />
      </AdminGuard>
    </AuthGuard>
  </Route>

  <Route path="/privacy">
    <Privacy />
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

  <Route path="/bravery">
    <AuthGuard>
      <Bravery />
    </AuthGuard>
  </Route>

  <Route path="/forgot-password">
    <ForgotPassword />
  </Route>

  <Route path="/reset-password">
    <ResetPassword />
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

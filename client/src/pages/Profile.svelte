<script>
  import { auth } from '../stores/userStore.svelte.js';
  import { changePassword, deleteAccount, logout } from '../services/auth.js';
  import toastr from 'toastr';

  let formView = $state('Saved');
  let oldPassword = $state();
  let newPassword = $state();
  let newPasswordAgain = $state();
</script>

<svelte:head><title>UpLoL | Profile</title></svelte:head>

<main class="min-h-screen bg-zinc-950/80 flex items-center justify-center p-4">
  <div class="bg-zinc-900 border border-zinc-800 w-full max-w-sm p-8 flex flex-col gap-4">
    <h1 class="text-2xl text-amber-400">Profile</h1>

    <p class="text-sm text-zinc-400">Username: <span class="text-zinc-100">{auth.user.username}</span></p>
    <p class="text-sm text-zinc-400">Email: <span class="text-zinc-100">{auth.user.email}</span></p>

    <hr class="border-zinc-800" />

    {#if formView === 'Saved'}
      <button onclick={() => (formView = 'Edit')} class="bg-amber-400 text-zinc-950 py-2 text-sm cursor-pointer">
        Edit Profile
      </button>
      <button
        type="button"
        class="text-sm border border-zinc-700 text-zinc-300 py-2 cursor-pointer hover:text-amber-400"
        onclick={async () => {
          await logout();
        }}
      >
        Logout
      </button>
    {:else if formView === 'Edit'}
      <button
        type="button"
        class="text-sm bg-amber-400 cursor-pointer py-2"
        onclick={async () => {
          formView = 'Password';
        }}
      >
        Change Password
      </button>

      <button
        class="text-sm bg-amber-400 cursor-pointer py-2"
        onclick={() => {
          formView = 'Saved';
        }}>Cancel</button
      >
      <button
        class="border border-zinc-700 text-zinc-300 py-2 text-sm cursor-pointer hover:text-red-400"
        onclick={() => {
          formView = 'Delete';
        }}
      >
        Delete Account
      </button>
    {:else if formView === 'Password'}
      <form
        class="flex flex-col gap-2"
        onsubmit={async (e) => {
          e.preventDefault();

          const success = await changePassword(oldPassword, newPassword, newPasswordAgain);

          if (!success) {
            return;
          }

          formView = 'Saved';
        }}
      >
        <input
          type="password"
          placeholder="Old password"
          bind:value={oldPassword}
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:border-amber-400 outline-none"
        />
        <input
          type="password"
          placeholder="New Password"
          bind:value={newPassword}
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:border-amber-400 outline-none"
        />
        <input
          type="password"
          placeholder="New Password Again"
          bind:value={newPasswordAgain}
          class="border border-zinc-800 bg-zinc-950 text-zinc-100 px-4 py-2 text-sm focus:border-amber-400 outline-none"
        />
        <button type="submit" class="text-sm bg-amber-400 cursor-pointer py-2">Change Password</button>
        <button
          class="text-sm bg-amber-400 cursor-pointer py-2"
          onclick={() => {
            formView = 'Saved';
          }}>Cancel</button
        >
      </form>
    {:else if formView === 'Delete'}
      <p class="text-sm text-zinc-400">Are you sure?</p>
      <button
        class="border border-red-700 text-red-400 py-2 text-sm cursor-pointer hover:text-red-600"
        aria-label="Delete Account Button"
        onclick={async () => {
          await deleteAccount();
        }}>Im sure. Delete Account</button
      >
      <button
        class="border border-zinc-700 text-zinc-300 py-2 cursor-pointer"
        onclick={() => {
          formView = 'Saved';
        }}>Cancel</button
      >
    {/if}
  </div>
</main>

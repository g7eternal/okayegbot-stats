<script>
  import { errorState, username, currentUser } from "$lib/common/stores.js";
  import { stats } from "$lib/common/stats.js";
  import SearchBar from "$lib/sections/SearchBar.svelte";
  import DataTabs from "$lib/sections/DataTabs.svelte";
</script>

<svelte:head>
  <title>Okayegbot stats</title>
  <link rel="icon" type="image/png" href="favicon.png" />
</svelte:head>

{#if $errorState}
  <div class="container-xl py-4 d-flex flex-column align-items-center fs-5">
    <img src="img/sadeg.webp" width="128" height="128" alt="Sadeg" />
    <p class="text-danger">{$errorState}</p>
  </div>
{:else if !($stats.length > 0)}
  <div class="container-xl">
    <div class="w-100 py-4 d-flex flex-column align-items-center fs-4">
      <img src="img/chateg.webp" width="128" height="128" alt="Okayeg" />
      <p class="my-4">Performing some eggregations...</p>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
{:else}
  <div class="container-xl">
    <SearchBar />
    {#if $username}
      {#if $currentUser}
        <DataTabs />
      {:else}
        <div class="container-fluid d-flex flex-column align-items-center">
          <img src="img/sadeg.webp" width="128" height="128" alt="Sadeg" />
          <p class="text-warning fs-4">User <b>@{$username}</b> is not in the list!</p>
        </div>
      {/if}
    {:else}
      <div class="w-100 text-center">
        <i class="text-muted">Type a username and click "Search"</i>
      </div>
    {/if}
  </div>
{/if}

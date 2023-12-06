<script>
  import { LOADING_LINES } from "$lib/common/consts.js";
  import { sample } from "$lib/common/utils.js";
  import { errorState } from "$lib/common/stores.js";
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
      <p class="my-4">
        {@html sample(LOADING_LINES)}
      </p>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
{:else}
  <div class="container-xl">
    <SearchBar />
    <DataTabs />
  </div>
{/if}

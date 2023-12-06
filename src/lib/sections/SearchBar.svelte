<script>
  import { stats } from "$lib/common/stats.js";
  import { username } from "$lib/common/stores.js";
  import { emergencyDestroyAllTooltips } from "$lib/common/chartTooltip.js";
  import { onMount } from "svelte";

  let usernameInput = "";

  function doSearch() {
    emergencyDestroyAllTooltips();
    if ($username !== usernameInput) {
      $username = usernameInput;
    }
  }

  function detectEnterKey(event) {
    if (event?.key === "Enter") {
      doSearch();
    }
  }

  onMount(() => {
    try {
      const hash = window.location.hash;
      if (hash) {
        usernameInput = hash.slice(1);
        doSearch();
      }
    } catch (e) {
      console.warn("Failed to extract username from window.location:", e);
    }
  });
</script>

<div class="container-fluid">
  <h1 class="my-2 text-center">
    <img src="img/okayeg.webp" width="48" height="48" alt="Okayeg" />
    OkayegBOT stats lookup
    <img src="img/okayeg.webp" width="48" height="48" alt="geyakO" class="mirror" />
  </h1>
  <div class="mb-3">
    <label for="searchbar_username" class="form-label fs-4">🔍 Enter your username:</label>
    <div class="input-group">
      <span class="input-group-text fw-bold">@</span>
      <input
        type="text"
        class="form-control"
        id="searchbar_username"
        list="suggestedUsernames"
        bind:value={usernameInput}
        on:keydown={detectEnterKey}
      />
      {#if !usernameInput && $username}
        <button class="btn btn-warning" type="button" on:click={doSearch}>Clear filter</button>
      {:else}
        <button class="btn btn-success" type="button" on:click={doSearch}>Search</button>
      {/if}
    </div>
  </div>
</div>

<datalist id="suggestedUsernames">
  {#each $stats.map((u) => u.username).sort() as uname}
    <option value={uname} />
  {/each}
</datalist>

<style>
  .mirror {
    transform: scaleX(-1);
  }
</style>

<script>
  import { currentUser, username } from "$lib/common/stores.js";
  import UserStats from "./UserStats.svelte";
  import CommandDataCard from "$lib/datacards/CommandDataCard.svelte";
  import RouletteDataCard from "$lib/datacards/RouletteDataCard.svelte";
  import CoinflipDataCard from "$lib/datacards/CoinflipDataCard.svelte";
  import DuelDataCard from "$lib/datacards/DuelDataCard.svelte";
  import TriviaDataCard from "$lib/datacards/TriviaDataCard.svelte";
  import StocksDataCard from "$lib/datacards/StocksDataCard.svelte";
  import Leaderboard from "$lib/sections/Leaderboard.svelte";
</script>

<div class="container-fluid flex-grow-1 d-flex flex-column">
  <ul class="nav nav-tabs">
    <li class="nav-item flex-sm-fill">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        class="nav-link fs-5 active"
        href=""
        data-bs-toggle="tab"
        data-bs-target="#tabStats"
        type="button"
        role="tab"
        aria-controls="tabStats"
        aria-selected="true">🔢 User stats</a
      >
    </li>
    <li class="nav-item flex-sm-fill">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        class="nav-link fs-5"
        href=""
        data-bs-toggle="tab"
        data-bs-target="#tabLeaderboard"
        type="button"
        role="tab"
        aria-controls="tabLeaderboard"
        aria-selected="false">📊 Leaderboards</a
      >
    </li>
  </ul>

  <div class="tab-content h-100">
    <div class="tab-pane active" id="tabStats" role="tabpanel">
      {#if $username}
        {#if $currentUser}
          <div class="row py-0 px-4">
            <div class="col-lg-6">
              <UserStats />

              <CommandDataCard />

              <StocksDataCard />
            </div>
            <div class="col-lg-6">
              <RouletteDataCard />

              <CoinflipDataCard />

              <DuelDataCard />

              <TriviaDataCard />
            </div>
          </div>
        {:else}
          <div class="container-fluid pt-4 d-flex flex-column align-items-center">
            <img src="img/sadeg.webp" width="128" height="128" alt="Sadeg" />
            <p class="text-warning fs-4">User <b>@{$username}</b> is not in the list!</p>
          </div>
        {/if}
      {:else}
        <div class="container-fluid py-4 text-center">
          <i class="text-muted">Type in a username and click "Search"</i>
        </div>
      {/if}
    </div>
    <div class="tab-pane" id="tabLeaderboard" role="tabpanel">
      <Leaderboard />
    </div>
  </div>
</div>

<style>
  .tab-pane {
    height: 100%;
    border-left: 1px solid var(--bs-border-color);
    border-right: 1px solid var(--bs-border-color);
    border-bottom: 1px solid var(--bs-border-color);
  }
</style>

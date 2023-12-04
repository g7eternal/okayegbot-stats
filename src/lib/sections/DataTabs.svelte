<script>
  import UserStats from "./UserStats.svelte";
  import ChartPlaceholder from "$lib/components/ChartPlaceholder.svelte";
  import CommandDataCard from "$lib/datacards/CommandDataCard.svelte";
  import RouletteDataCard from "$lib/datacards/RouletteDataCard.svelte";
  import CoinflipDataCard from "$lib/datacards/CoinflipDataCard.svelte";
  import DuelDataCard from "$lib/datacards/DuelDataCard.svelte";
  import TriviaDataCard from "$lib/datacards/TriviaDataCard.svelte";
  import StocksDataCard from "$lib/datacards/StocksDataCard.svelte";
</script>

<div class="container-fluid">
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

  <div class="tab-content">
    <div class="tab-pane active" id="tabStats" role="tabpanel">
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
    </div>
    <div class="tab-pane" id="tabLeaderboard" role="tabpanel">
      <ChartPlaceholder>Hold on, I'm cooking... Check back later</ChartPlaceholder>
    </div>
  </div>
</div>

<style>
  .tab-pane {
    border-left: 1px solid var(--bs-border-color);
    border-right: 1px solid var(--bs-border-color);
    border-bottom: 1px solid var(--bs-border-color);
  }
</style>

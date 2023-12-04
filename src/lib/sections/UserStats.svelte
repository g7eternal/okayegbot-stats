<script>
  import { currentUser } from "$lib/common/stores.js";
  import { COMMON_COLOR_KEYS } from "$lib/common/consts.js";
  import EggChartContainer from "$lib/components/EggChartContainer.svelte";
  import PlusEggChart from "$lib/charts/PlusEggChart.svelte";
  import DataCard from "$lib/components/DataCard.svelte";
  import DataLine from "$lib/components/DataLine.svelte";
  import LegendTable from "$lib/components/LegendTable.svelte";
  import VersusLine from "$lib/components/VersusLine.svelte";

  const fallbackImageUrl = "/img/okayeg.webp";
  let imageUrl = null;
  $: {
    imageUrl = null;
    fetch("https://7tv.io/v3/users/twitch/" + $currentUser._id)
      .then((data) => data.json())
      .then((data) => {
        if (!data.user) throw new Error("User not found");
        imageUrl = data.user.avatar_url;
      })
      .catch((e) => {
        console.warn("Failed to fetch user image", e);
        imageUrl = fallbackImageUrl;
      });
  }

  function setFallbackImage() {
    imageUrl = fallbackImageUrl;
  }
</script>

<div>
  <DataCard>
    <DataLine>
      <h4 class="fw-bold">
        {#if imageUrl}
          <img src={imageUrl} width="36" height="36" alt={$currentUser.username} on:error={setFallbackImage} />
        {:else}
          <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        {/if}
        {$currentUser.username}
      </h4>
    </DataLine>
    <div>
      {#if $currentUser._raw.eguses}
        <div class="d-flex flex-row align-items-center mw-100">
          <div class="w-50">
            <EggChartContainer>
              <PlusEggChart />
            </EggChartContainer>
          </div>
          <div class="flex-grow-1">
            <h6><b> =eg </b> stats</h6>
            <LegendTable
              data={{
                Loss: $currentUser.egStats.l,
                Nil: $currentUser.egStats.d,
                Gain: $currentUser.egStats.w,
              }}
              ratioOf={$currentUser._raw.eguses}
              colorMap={COMMON_COLOR_KEYS}
            />
            <DataLine label="🥚 Eggs:">
              {$currentUser.egs}
            </DataLine>
            <VersusLine
              title={"Transferred in total"}
              data={Object.values($currentUser.egTransfers)}
              labels={Object.keys($currentUser.egTransfers)}
            />
          </div>
        </div>
      {:else}
        <DataLine label="🥚 Egs:">
          {$currentUser.egs}
        </DataLine>
      {/if}
    </div>
  </DataCard>
</div>

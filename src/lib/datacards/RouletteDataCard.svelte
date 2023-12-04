<script>
  import { COMMON_COLOR_KEYS } from "$lib/common/consts.js";
  import { currentUser } from "$lib/common/stores.js";
  import ChartedDataCard from "$lib/components/ChartedDataCard.svelte";
  import EggChartContainer from "$lib/components/EggChartContainer.svelte";
  import GenericWinLossChart from "$lib/charts/GenericWinLossChart.svelte";
  import LegendTable from "$lib/components/LegendTable.svelte";
  import VersusLine from "$lib/components/VersusLine.svelte";
</script>

<ChartedDataCard
  title="🎰 Roulette"
  condition={$currentUser.roulette.total}
  placeholder="User did not play the roulette"
>
  <div class="w-50 m-auto">
    <EggChartContainer>
      <GenericWinLossChart data={$currentUser.roulette} />
    </EggChartContainer>
  </div>
  <div class="flex-grow-1">
    <LegendTable
      data={{ Lose: $currentUser.roulette.l, Win: $currentUser.roulette.w }}
      ratioOf={$currentUser.roulette.total}
      showTotal={true}
      colorMap={COMMON_COLOR_KEYS}
    />
    <VersusLine
      title={"Record gain/loss in 1 game"}
      data={[$currentUser.roulette.min, $currentUser.roulette.max]}
      labels={["loss", "gain"]}
    />
  </div>
</ChartedDataCard>

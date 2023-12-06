<script>
  import { COMMON_COLOR_KEYS } from "$lib/common/consts.js";
  import { currentUser } from "$lib/common/stores.js";
  import ChartedDataCard from "$lib/components/ChartedDataCard.svelte";
  import EggChartContainer from "$lib/components/EggChartContainer.svelte";
  import GenericWinLossChart from "$lib/charts/GenericWinLossChart.svelte";
  import LegendTable from "$lib/components/LegendTable.svelte";
  import VersusLine from "$lib/components/VersusLine.svelte";
</script>

<ChartedDataCard title="⚔️ Duels" condition={$currentUser.duel.total} placeholder="User never joined a duel">
  <div class="w-50 m-auto">
    <EggChartContainer>
      <GenericWinLossChart data={$currentUser.duel} />
    </EggChartContainer>
  </div>
  <div class="flex-grow-1">
    <LegendTable
      data={{ Lose: $currentUser.duel.l, Win: $currentUser.duel.w }}
      ratioOf={$currentUser.duel.total}
      showTotal={true}
      colorMap={COMMON_COLOR_KEYS}
    />
    <VersusLine
      title={"Record gain/loss in 1 duel"}
      data={[$currentUser.duel.min, $currentUser.duel.max]}
      labels={["loss", "gain"]}
    />
  </div>
</ChartedDataCard>

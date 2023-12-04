<script>
  import { COMMON_COLOR_KEYS } from "$lib/common/consts.js";
  import { currentUser } from "$lib/common/stores.js";
  import ChartedDataCard from "$lib/components/ChartedDataCard.svelte";
  import EggChartContainer from "$lib/components/EggChartContainer.svelte";
  import GenericWinLossChart from "$lib/charts/GenericWinLossChart.svelte";
  import LegendTable from "$lib/components/LegendTable.svelte";
  import VersusLine from "$lib/components/VersusLine.svelte";
</script>

<ChartedDataCard title="🪙 Coinflip" condition={$currentUser.coinflip.total} placeholder="No tracked coin flips">
  <div class="w-50 m-auto">
    <EggChartContainer>
      <GenericWinLossChart data={$currentUser.coinflip} />
    </EggChartContainer>
  </div>
  <div class="flex-grow-1">
    <LegendTable
      data={{ Lose: $currentUser.coinflip.l, Win: $currentUser.coinflip.w }}
      ratioOf={$currentUser.coinflip.total}
      showTotal={true}
      colorMap={COMMON_COLOR_KEYS}
    />
    <VersusLine
      title={"Record gain/loss in 1 game"}
      data={[$currentUser.coinflip.min, $currentUser.coinflip.max]}
      labels={["loss", "gain"]}
    />
  </div>
</ChartedDataCard>

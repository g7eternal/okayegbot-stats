<script>
  import { currentUser } from "$lib/common/stores.js";
  import ChartedDataCard from "$lib/components/ChartedDataCard.svelte";
  import EggChartContainer from "$lib/components/EggChartContainer.svelte";
  import StocksChart from "$lib/charts/StocksChart.svelte";
  import LegendTable from "$lib/components/LegendTable.svelte";
</script>

<ChartedDataCard title="💹 Stocks" condition={$currentUser.subtotal.stocks} placeholder="No stocks owned">
  <div class="w-50 m-auto">
    <EggChartContainer>
      <StocksChart />
    </EggChartContainer>
  </div>
  <div class="flex-grow-1">
    <LegendTable data={$currentUser.stocks} showTotal={true} ratioOf={$currentUser.subtotal.stocks} />
  </div>
</ChartedDataCard>

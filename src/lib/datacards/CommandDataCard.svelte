<script>
  import { currentUser } from "$lib/common/stores.js";
  import ChartedDataCard from "$lib/components/ChartedDataCard.svelte";
  import EggChartContainer from "$lib/components/EggChartContainer.svelte";
  import CommandChart from "$lib/charts/CommandChart.svelte";
  import LegendTable from "$lib/components/LegendTable.svelte";
</script>

<ChartedDataCard title="⌨️ Commands" condition={$currentUser.subtotal.commands} placeholder="No commands used">
  <div class="w-50 m-auto">
    <EggChartContainer>
      <CommandChart />
    </EggChartContainer>
  </div>
  <div class="flex-grow-1">
    <LegendTable data={$currentUser.commands} showTotal={true} />
  </div>
</ChartedDataCard>

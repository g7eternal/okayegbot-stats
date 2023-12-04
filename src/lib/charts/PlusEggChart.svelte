<script>
  import { makeGenericDataElement } from "$lib/common/utils.js";
  import { currentUser } from "$lib/common/stores.js";
  import { externalTooltipHandler, tooltipInitPlugin } from "$lib/common/chartTooltip.js";

  import { Chart as ChartJS, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from "chart.js";
  import { Bar } from "svelte-chartjs";

  ChartJS.register(Tooltip, Legend, BarElement, LinearScale, CategoryScale);

  const data = {
    labels: [""],
    datasets: [],
  };

  $: {
    data.datasets = [
      makeGenericDataElement("Gain", $currentUser.egStats.w, "GREEN"),
      makeGenericDataElement("Nil", $currentUser.egStats.d, "YELLOW"),
      makeGenericDataElement("Loss", $currentUser.egStats.l, "RED"),
    ];
  }
</script>

<Bar
  {data}
  plugins={[tooltipInitPlugin]}
  options={{
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        stacked: true,
        beginAtZero: true,
      },
      y: {
        display: false,
        stacked: true,
        max: $currentUser.egStats.total,
        beginAtZero: true,
      },
    },
  }}
/>

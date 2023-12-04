<script>
  import { writable } from "svelte/store";
  import { makeGenericDataElement } from "$lib/common/utils.js";
  import { externalTooltipHandler, tooltipInitPlugin } from "$lib/common/chartTooltip.js";

  import { Chart as ChartJS, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from "chart.js";
  import { Bar } from "svelte-chartjs";

  ChartJS.register(Tooltip, Legend, BarElement, LinearScale, CategoryScale);

  export let data = { w: 0, l: 0 };

  let sumOfBoth = writable(0);
  const dataset = {
    labels: [""],
    datasets: [],
  };

  $: {
    sumOfBoth.set(data.w + data.l);
    dataset.datasets = [makeGenericDataElement("Win", data.w, "GREEN"), makeGenericDataElement("Lose", data.l, "RED")];
  }
</script>

<Bar
  data={dataset}
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
        max: $sumOfBoth,
        beginAtZero: true,
      },
    },
  }}
/>

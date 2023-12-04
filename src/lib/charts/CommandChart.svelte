<script>
  import { Chart as ChartJS, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from "chart.js";
  import { Bar } from "svelte-chartjs";
  import { externalTooltipHandler, tooltipInitPlugin } from "$lib/common/chartTooltip.js";

  import { currentUser } from "$lib/common/stores.js";
  import { COMMAND_COLORS } from "$lib/common/consts.js";
  import { makeGenericDataElement } from "$lib/common/utils.js";

  ChartJS.register(Tooltip, Legend, BarElement, LinearScale, CategoryScale);

  const data = {
    labels: [""],
    datasets: [],
  };

  $: {
    const newDataset = [];

    Object.keys($currentUser.commands).forEach((key, i) => {
      const count = $currentUser.commands[key];
      newDataset.push(makeGenericDataElement(key, count, COMMAND_COLORS[i]));
    });

    data.datasets = newDataset.sort((a, b) => b.data[0] - a.data[0]);
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
        suggestedMax: 10,
        beginAtZero: true,
      },
      y: {
        display: false,
        stacked: true,
        max: $currentUser.subtotal.commands,
        beginAtZero: true,
      },
    },
  }}
/>

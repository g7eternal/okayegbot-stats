<script>
  import { currentUser } from "$lib/common/stores.js";
  import { externalTooltipHandler, tooltipInitPlugin } from "$lib/common/chartTooltip.js";
  import { CHART_BG, CHART_COLORS, STOCKS } from "$lib/common/consts.js";

  import { Chart as ChartJS, Tooltip, Legend, BarElement, LinearScale, CategoryScale } from "chart.js";
  import { Bar } from "svelte-chartjs";

  ChartJS.register(Tooltip, Legend, BarElement, LinearScale, CategoryScale);

  const colorKeys = Object.keys(CHART_BG);

  const data = {
    labels: [""],
    datasets: [],
  };

  $: {
    const newDataset = [];

    STOCKS.forEach((key, i) => {
      newDataset.push({
        label: key,
        data: [$currentUser.stocks[key]],
        borderWidth: 2,
        backgroundColor: CHART_BG[colorKeys[i]],
        borderColor: CHART_COLORS[colorKeys[i]],
      });
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
        max: $currentUser.subtotal.stocks,
        beginAtZero: true,
      },
    },
  }}
/>

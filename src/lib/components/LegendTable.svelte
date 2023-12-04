<script>
  import { TABLE_BG, COMMAND_COLORS } from "$lib/common/consts.js";

  export let data;
  export let colorMap = {};
  export let showTotal = false;
  export let ratioOf = null;
</script>

<table class="table">
  <tbody>
    {#each Object.keys(data) as key, i}
      <tr style:background-color={TABLE_BG[colorMap[key]] || TABLE_BG[COMMAND_COLORS[i]]}>
        <td>{key}</td>
        {#if ratioOf !== null}
          <td class="text-end"><small><em>{Math.round((100 * data[key]) / ratioOf)}%</em></small></td>
        {/if}
        <td class="fw-bold text-end">{data[key]}</td>
      </tr>
    {/each}
    {#if showTotal}
      <tr class="subtotal">
        <td>TOTAL</td>
        {#if ratioOf !== null}
          <td></td>
        {/if}
        <td class="fw-bold text-end">
          {ratioOf || Object.values(data).reduce((a, v) => a + v, 0)}
        </td>
      </tr>
    {/if}
  </tbody>
</table>

<style>
  table {
    border: 1px solid var(--bs-secondary-border-subtle);
  }

  td {
    background-color: inherit;
    font-size: 90%;
    padding: 2px 1rem;
  }
  td:first-child {
    min-width: 40%;
  }

  .subtotal {
    font-size: 111%;
  }
</style>

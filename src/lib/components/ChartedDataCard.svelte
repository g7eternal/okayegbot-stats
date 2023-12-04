<script>
  import ChartPlaceholder from "./ChartPlaceholder.svelte";

  export let title = "";
  export let condition = true;
  export let placeholder = "No data available";
</script>

<div class="card my-4">
  <div class="card-body">
    {#if title}
      <h5 class="card-title">{title}</h5>
    {/if}
    <div class="card-text d-flex flex-row align-items.center">
      {#if condition}
        <slot />
      {:else}
        <ChartPlaceholder>{placeholder}</ChartPlaceholder>
      {/if}
    </div>
  </div>
</div>

<style>
  .card-text > * {
    flex: 1 0 auto;
  }
</style>

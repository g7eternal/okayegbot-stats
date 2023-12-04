<script>
  export let title = "";
</script>

<div class="card my-4">
  <div class="card-body">
    {#if title}
      <h5 class="card-title">{title}</h5>
    {/if}
    <div class="card-text d-flex flex-column">
      <slot />
    </div>
  </div>
</div>

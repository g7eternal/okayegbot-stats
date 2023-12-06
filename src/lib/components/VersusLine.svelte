<script>
  export let title = "";
  export let data = [0, 0];
  export let labels = [];

  const ratio = [0, 0];

  $: {
    const total = data[0] + data[1];

    if (total > 0) {
      ratio[0] = (100 * data[0]) / total;
      ratio[1] = (100 * data[1]) / total;
    } else {
      ratio[0] = 50;
      ratio[1] = 50;
    }
  }
</script>

<div class="d-flex flex-column mt-2">
  <div class="title">{title}</div>
  <div class="versus">
    <div class="vs left" style:width={ratio[0] + "%"}>{data[0]}</div>
    <div class="vs right" style:width={ratio[1] + "%"}>{data[1]}</div>
  </div>
  <div class="versus labels">
    <div class="flex-grow-1 text-start">{labels[0] || ""}</div>
    <div class="flex-grow-1 text-end">{labels[1] || ""}</div>
  </div>
</div>

<style>
  .title {
    font-size: 85%;
    text-align: center;
    text-transform: uppercase;
    opacity: 75%;
  }
  .versus {
    display: flex;
    flex-flow: row nowrap;
    max-width: 100%;
  }
  .labels {
    font-size: 70%;
    opacity: 50%;
    padding: 0 4px;
  }
  .vs {
    word-wrap: normal;
    width: auto;
    min-width: fit-content;
    font-size: 90%;
    font-weight: bold;
    text-shadow: 0px 0px 2px black;
    padding: 4px;
    border: 1px solid var(--bs-secondary-border-subtle);
    transition: width 0.5s ease-in-out;
  }
  .left {
    background: var(--bs-danger-bg-subtle);
    text-align: left;
    margin-right: auto;
  }
  .right {
    background: var(--bs-success-bg-subtle);
    text-align: right;
    margin-left: auto;
  }
</style>

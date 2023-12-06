<script>
  import { browser } from "$app/environment";
  import { writable } from "svelte/store";
  import { leaderboard, sortingProperties } from "$lib/common/leaderboard.js";
  import { username } from "$lib/common/stores.js";
  import { onMount } from "svelte";

  let data = [];
  const dataPage = writable(1);
  const dataOffset = writable(0);
  let dataMaxPage = 1;
  let dataPortion = 10;
  let dataChunk = [];
  let dataChunkInflation = 0;

  const propertyFilter = writable({
    main: "egs",
    winloss: "w",
    stocks: "",
    egStats: "w",
    egTransfers: "out",
    commands: "",
  });

  function generateTableData() {
    // build the property:
    let prop = [$propertyFilter.main];

    if (sortingProperties.winLoseCategoryList.includes(prop[0])) {
      prop.push($propertyFilter.winloss);
    } else {
      switch (prop[0]) {
        case "stocks":
        case "commands": {
          const secondary = $propertyFilter[prop[0]];
          if (secondary) {
            prop.push(secondary);
          } else {
            // replace main property with a `subtotal` reference
            prop.push(`subtotal.${prop.pop()}`);
          }
          break;
        }
        case "egTransfers":
        case "egStats": {
          prop.push($propertyFilter[prop[0]]);
          break;
        }
        // default: regular prop, depth of 1
      }
    }

    console.log("Active leaderboard filter property:", prop);
    prop = prop.join(".");

    // fetch data from cache:
    data = leaderboard.get(prop);

    dataMaxPage = Math.ceil(data.length / dataPortion);
    dataOffset.set(0);
    dataPage.set(1);
    updateDataChunk();
  }

  function updateDataChunk() {
    dataChunk = data.slice($dataOffset, $dataOffset + dataPortion);
    dataChunkInflation = 0;

    if ($username) {
      const userBoundData = data.findIndex((entry) => entry.user === $username);
      if (dataChunk.indexOf(data[userBoundData]) < 0) {
        dataChunkInflation = 1;
        if (userBoundData > $dataOffset) {
          dataChunk.push(data[userBoundData]);
        } else {
          dataChunk.unshift(data[userBoundData]);
        }
      }
    }
  }

  let isPageScrolled = false;
  function checkIfPageIsScrolled() {
    isPageScrolled = browser && window.scrollY / window.innerHeight > 0.33;
  }

  function scrollBackToTop() {
    document.getElementById("pageTopAnchor").scrollIntoView();
  }
  function goToHighlightedRow() {
    // attach as an event listener
    // "this" context - clicked <td> element
    if (this.parentElement.classList.contains("highlight")) {
      this.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
    }
  }

  onMount(() => {
    // if leaderboard is being mounted, the data fetch was successful
    propertyFilter.subscribe((v) => {
      generateTableData();
    });

    dataPage.subscribe((value) => {
      const n = Number(value);

      if (Number.isNaN(n) || n < 1) {
        dataPage.set(1);
        return;
      }
      if (n > dataMaxPage) {
        dataPage.set(dataMaxPage);
        return;
      }
      $dataOffset = dataPortion * (n - 1);
      updateDataChunk();
    });

    username.subscribe((value) => {
      // need to call this to render the "green" row
      updateDataChunk();
    });
  });
</script>

<svelte:window on:scroll={checkIfPageIsScrolled} />

<div class="leaderboard-table h-100">
  <div class="filters">
    <div class="flex-grow-1">
      <select id="lb_propertyFilter_main" class="form-select" bind:value={$propertyFilter.main}>
        {#each Object.keys(sortingProperties.category) as key}
          <option value={key}>{sortingProperties.category[key]}</option>
        {/each}
      </select>
    </div>
    {#if sortingProperties.winLoseCategoryList.includes($propertyFilter.main)}
      <div class="w-25">
        <select class="form-select" bind:value={$propertyFilter.winloss}>
          {#each Object.keys(sortingProperties.winLose) as key}
            <option value={key}>{sortingProperties.winLose[key]}</option>
          {/each}
        </select>
      </div>
    {/if}
    {#if $propertyFilter.main === "egStats" || $propertyFilter.main === "egTransfers"}
      <div class="w-25">
        <select class="form-select" bind:value={$propertyFilter[$propertyFilter.main]}>
          {#each Object.keys(sortingProperties[$propertyFilter.main]) as key}
            <option value={key}>{sortingProperties[$propertyFilter.main][key]}</option>
          {/each}
        </select>
      </div>
    {/if}
    {#if $propertyFilter.main === "commands" || $propertyFilter.main === "stocks"}
      <div class="w-25">
        <select class="form-select" bind:value={$propertyFilter[$propertyFilter.main]}>
          <option value="">Total amount</option>
          {#each sortingProperties[$propertyFilter.main] as key}
            <option value={key}>{key}</option>
          {/each}
        </select>
      </div>
    {/if}
  </div>

  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Rank</th>
          <th class="flex-grow-1">User</th>
          <th>
            {#if isPageScrolled}
              <button class="btn btn-secondary btn-scrollback" on:click={scrollBackToTop}> Scroll to top </button>
            {/if}
          </th>
        </tr>
      </thead>
      <tbody>
        {#each dataChunk as entry (entry.id)}
          <tr
            class:highlight={$username === entry.user}
            class:l-first={entry.rank === 1}
            class:l-second={entry.rank === 2}
            class:l-third={entry.rank === 3}
          >
            <td on:click={goToHighlightedRow}>
              {entry.rank}
            </td>
            <td class="flex-grow-1">
              <a href={"#" + entry.user}>{entry.user}</a>
            </td>
            <td>
              {entry.value}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="paginator px-2">
    <div>
      <select
        class="form-select form-select-sm w-auto"
        on:change={function () {
          dataPortion = Number(this.value);
          dataMaxPage = Math.ceil(data.length / dataPortion);

          const newPage = Math.min($dataPage, dataMaxPage);
          $dataOffset = dataPortion * (newPage - 1);
          $dataPage = newPage;
          updateDataChunk();
        }}
      >
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
      </select> items per page
    </div>
    <div class="flex-grow-1 text-center">
      <em>
        Showing
        <strong>{1 + $dataOffset}-{$dataOffset + dataChunk.length - dataChunkInflation}</strong>
        of
        <strong>{data.length}</strong>
        entries
      </em>
    </div>
    <div class="paginator-page">
      <button class="btn" on:click={() => ($dataPage = 1)}>⏪</button>
      <button class="btn" on:click={() => ($dataPage > 1 ? $dataPage-- : 0)}>◀️</button>
      <span class="py">
        <b contenteditable="true" bind:innerText={$dataPage} />
        <span class="text-muted">/ {dataMaxPage}</span>
      </span>
      <button class="btn" on:click={() => ($dataPage < dataMaxPage ? $dataPage++ : 0)}>▶️</button>
      <button class="btn" on:click={() => ($dataPage = dataMaxPage)}>⏩</button>
    </div>
  </div>
</div>

<style>
  .leaderboard-table {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
  }

  .filters {
    padding: 1rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }

  .table-container {
    flex: 1 0 0;
    overflow: auto;
    min-height: 0;
  }
  table {
    margin: 0;
    position: relative;
  }
  thead {
    position: sticky;
    box-shadow:
      1px 1px 0 var(--bs-border-color),
      -1px -1px 0 var(--bs-border-color);
    top: 0px;
    z-index: 3;
  }
  td {
    background-color: transparent;
    transition: background-color 0.3s ease;
  }
  tr:hover td,
  tr:focus td {
    filter: invert(0.1);
    background-color: rgba(128, 128, 128, 0.1);
    border-bottom: 1px solid var(--bs-border-color);
  }
  tr.highlight td {
    position: sticky;
    bottom: 0px;
    top: 2.55rem;
    z-index: 2;
    box-shadow: 1px 1px 0 var(--bs-border-color);
    background: var(--bs-success-bg-subtle);
  }

  th:first-child,
  td:first-child {
    width: 10%;
    text-align: center;
  }
  th:last-child,
  td:last-child {
    width: 15%;
    text-align: right;
    padding-right: 1.5rem;
  }

  tbody > tr.l-first > td:first-child {
    font-weight: bold;
    color: gold;
    text-shadow: 0px 0px 4px orange;
  }
  tbody > tr.l-second > td:first-child {
    font-weight: bold;
    color: silver;
    text-shadow: 0px 0px 4px gray;
  }
  tbody > tr.l-third > td:first-child {
    font-weight: bold;
    color: coral;
    text-shadow: 0px 0px 4px brown;
  }

  a {
    text-decoration: none;
  }
  select {
    display: inline-block;
  }

  .btn-scrollback {
    font-size: 75%;
    padding: 4px 0.5rem;
  }

  .paginator {
    padding: 0.5rem 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    text-align: right;
    position: sticky;
    z-index: 2;
    bottom: 0px;
    background-color: var(--bs-body-bg);
    box-shadow: 0px -1px var(--bs-border-color);
  }
  .paginator-page > * {
    padding: 2px;
    vertical-align: middle;
  }
</style>

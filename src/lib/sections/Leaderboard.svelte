<script>
  import { browser } from "$app/environment";
  import { stats } from "$lib/common/stats.js";
  import { username } from "$lib/common/stores.js";

  const data = [];

  $: {
    const uniqueValues = new Set();
    for (const user of $stats) {
      const value = user.egs;

      uniqueValues.add(value);
      data.push({ user: String(user.username), value: value });
    }

    const sortedValues = Array.from(uniqueValues.values()).sort((a, b) => b - a);
    for (const entry of data) {
      entry.rank = 1 + sortedValues.indexOf(entry.value);
    }

    data.sort((a, b) => a.rank - b.rank || a.user.localeCompare(b.user));
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
</script>

<svelte:window on:scroll={checkIfPageIsScrolled} />

<div class="leaderboard-table">
  <div class="filters">
    <div class="flex-grow-1">🥚 Top eg hoarders:</div>
    <div class="flex-grow-1">
      <small><em>todo: filters and stuff - coming soon™️</em></small>
    </div>
  </div>
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
      {#each data as entry (entry.user)}
        <tr class:highlight={$username === entry.user}>
          <td on:click={goToHighlightedRow}>
            {entry.rank}
          </td>
          <td class="flex-grow-1">
            <a href={"https://twitch.tv/" + entry.user} target="_blank">{entry.user}</a>
          </td>
          <td>
            {entry.value}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .leaderboard-table {
    padding: 1rem 0;
    position: relative;
  }

  .filters {
    padding: 1rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }

  thead {
    position: sticky;
    box-shadow:
      1px 1px 0 var(--bs-border-color),
      -1px -1px 0 var(--bs-border-color);
    top: 0px;
    z-index: 3;
  }
  tr.highlight td {
    position: sticky;
    bottom: 0px;
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
    padding-right: 1rem;
  }

  tbody > tr:nth-child(1) > td:first-child {
    font-weight: bold;
    color: gold;
    text-shadow: 0px 0px 4px orange;
  }
  tbody > tr:nth-child(2) > td:first-child {
    font-weight: bold;
    color: silver;
    text-shadow: 0px 0px 4px gray;
  }
  tbody > tr:nth-child(3) > td:first-child {
    font-weight: bold;
    color: coral;
    text-shadow: 0px 0px 4px brown;
  }

  a {
    text-decoration: none;
  }

  .btn-scrollback {
    font-size: 75%;
    padding: 4px 0.5rem;
  }
</style>

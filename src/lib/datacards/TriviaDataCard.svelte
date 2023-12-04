<script>
  import { COMMON_COLOR_KEYS } from "$lib/common/consts.js";
  import { currentUser } from "$lib/common/stores.js";
  import DataCard from "$lib/components/DataCard.svelte";
  import DataLine from "$lib/components/DataLine.svelte";
</script>

<DataCard title="🤓 Trivia" placeholder="User never answered a question">
  <DataLine label="☑️ Questions answered:">
    {$currentUser.trivia}
  </DataLine>
</DataCard>

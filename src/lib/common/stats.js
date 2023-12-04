import { readable } from "svelte/store";
import { errorState } from "./stores.js";

const DATA_SOURCE = "https://okayeg.com/data/usersrecap.json";

export const stats = readable([], async (set) => {
  try {
    const data = await fetch(DATA_SOURCE);
    const json = await data.json();

    if (!Array.isArray(json)) {
      throw new Error("Invalid data structure");
    }

    console.info("Okayegbot data loaded. Entries:", json.length);

    set(json);
  } catch (e) {
    console.error("Data fetch failed", e);
    errorState.set(e.message);
  }
});

import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { stats } from "./stats.js";

export const errorState = writable("");

// get username from user's link:
const initialUsername = String(browser ? window.location.hash || "" : "").replaceAll("#", "");

export const username = writable("");
export const currentUser = writable(null);

let dataRef;
stats.subscribe((data) => {
  dataRef = data;

  // do the first search upon receiving useful data:
  if (dataRef.length > 0 && initialUsername) {
    username.set(initialUsername);
  }
});

username.subscribe((newUsername) => {
  const lcase = newUsername.toLowerCase();

  const userdata = dataRef.find((user) => user.username === lcase) || null;
  console.log("Current user:", userdata);
  currentUser.set(userdata);

  if (browser) {
    const newUrl = window.location.origin + window.location.pathname + "#" + lcase;
    window.history.replaceState(userdata, "", newUrl);
  }
});

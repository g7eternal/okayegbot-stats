import { writable } from "svelte/store";
import { stats } from "./stats.js";
import { STOCKS } from "$lib/common/consts.js";

export const errorState = writable("");

export const username = writable("");
export const currentUser = writable(null);

let dataRef;
stats.subscribe((data) => {
  dataRef = data;
});

username.subscribe((newUsername) => {
  const lcase = newUsername.toLowerCase();

  const raw = dataRef.find((user) => user.username === lcase) || null;
  let userdata = null;

  if (raw !== null) {
    userdata = {
      _id: raw._id,
      _raw: raw,
      username: raw.username,
      egs: raw.egs || 0,
      eaten: raw.egseaten || 0,
      commands: {
        "=eg": raw.eguses || 0,
        "=eat": raw.egseaten || 0,
        "=coinflip": raw.coinflips || 0,
        "=join / lottery": raw.lotteryjoins || 0,
        "=trivia": raw.trivia || 0,
        "=duel": raw.duels || 0,
        "=roulette": raw.roulettes || 0,
        Other: 0,
      },
      egStats: {
        total: raw.eguses || 0,
        w: raw.plus || 0,
        l: raw.negative || 0,
        d: raw.zero || 0,
      },
      egTransfers: {
        out: raw.egsgiven || 0,
        in: raw.egsreceived || 0,
      },
      trivia: raw.trivia || 0,
      duel: {
        total: raw.duels,
        w: raw.duelswon || 0,
        l: (raw.duels || 0) - (raw.duelswon || 0),
        max: raw.biggestduelwin || 0,
        min: raw.biggestduelloss || 0,
      },
      roulette: {
        total: raw.roulettes,
        w: raw.rouletteswon || 0,
        l: (raw.roulettes || 0) - (raw.rouletteswon || 0),
        max: raw.biggestroulettewin || 0,
        min: raw.biggestrouletteloss || 0,
      },
      coinflip: {
        total: raw.coinflips,
        w: raw.coinflipwins || 0,
        l: (raw.coinflips || 0) - (raw.coinflipwins || 0),
        max: raw.biggestcoinflipwin || 0,
        min: raw.biggestcoinfliploss || 0,
      },
      stocks: {},
      subtotal: {
        commands: raw.uses || 0,
        stocks: 0,
      },
    };

    userdata.commands.Other = userdata.subtotal.commands - Object.values(userdata.commands).reduce((a, v) => a + v, 0);

    for (const s of STOCKS) {
      const amount = raw[s] || 0;
      userdata.stocks[s] = amount;
      userdata.subtotal.stocks += amount;
    }
  }

  console.log("Current user:", userdata);
  currentUser.set(userdata);
});

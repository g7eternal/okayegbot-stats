import { stats } from "$lib/common/stats.js";

// auxiliary sorting functions:
const sortNumbersAscending = (a, b) => a - b;
const sortNumbersDescending = (a, b) => b - a;

function buildRankedUserListByProperty(property, inverseSort = false) {
  const data = [];
  const path = property.split(".");

  const uniqueValues = new Set();

  for (const user of dataRef) {
    // resolve requested path: (like "duels.w")
    const value = path.reduce((obj, key) => obj[key], user);

    uniqueValues.add(value);
    data.push({ id: Number(user._id), user: String(user.username), value: value });
  }

  // normal sort: bigger first | inverse sort: smaller first
  const sortedValues = Array.from(uniqueValues.values()).sort(
    inverseSort ? sortNumbersAscending : sortNumbersDescending
  );

  for (const entry of data) {
    entry.rank = 1 + sortedValues.indexOf(entry.value);
  }

  return data.sort((a, b) => a.rank - b.rank || a.user.localeCompare(b.user));
}

// various property maps
export const leaderboard = new Map();

export const sortingProperties = {
  winLoseCategoryList: ["coinflip", "roulette", "duel"],
  category: {
    egs: "Total egs",
    eaten: "Egs eaten",
    commands: "Commands used",
    egStats: "=eg results",
    egTransfers: "Most transferred egs",
    stocks: "Stocks in possession",
    coinflip: "Coinflip stats",
    roulette: "Roulette stats",
    duel: "Duel stats",
    trivia: "Trivia questions answered",
  },
  winLose: {
    total: "total attempts",
    w: "wins",
    l: "losses",
    max: "biggest win",
    min: "biggest loss",
  },
  commands: ["=eg", "=eat", "=coinflip", "=join / lottery", "=duel", "=roulette", "Other"],
  stocks: ["bajcoin", "chicken", "copium", "shungite"],
  egStats: { w: "Positive (gain)", d: "Neutral (nil)", l: "Negative (loss)" },
  egTransfers: { in: "In / received", out: "Out / given" },
};

// precalculation of leaderboard ranks:

let dataRef = [];
stats.subscribe((data) => {
  dataRef = data;

  // calculate all ranks:
  for (const prop in sortingProperties.category) {
    const queue = [];

    if (sortingProperties.winLoseCategoryList.includes(prop)) {
      // win, lose, etc
      Object.keys(sortingProperties.winLose).forEach((wl) => queue.push(`${prop}.${wl}`));
    } else {
      switch (prop) {
        case "stocks":
        case "commands": {
          sortingProperties[prop].forEach((k) => queue.push(`${prop}.${k}`));
          queue.push("subtotal." + prop);
          break;
        }
        case "egTransfers":
        case "egStats": {
          Object.keys(sortingProperties[prop]).forEach((k) => queue.push(`${prop}.${k}`));
          break;
        }
        default: {
          queue.push(prop);
          break;
        }
      }
    }

    for (const queuedProp of queue) {
      const data = buildRankedUserListByProperty(queuedProp);
      leaderboard.set(queuedProp, data);
    }
  }
});

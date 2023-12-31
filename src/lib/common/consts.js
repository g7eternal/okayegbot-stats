export const LOADING_LINES = [
  "Performing some eggregations...",
  "So many eggs! Need to load them all...",
  "<small class='opacity-75'>Accessing your browser history...</small><br>Ahem... I mean, loading eggs...",
];

export const COMMANDS = ["=eg", "=eat", "=coinflip", "=join / lottery", "=duel", "=roulette", "Other"];
export const STOCKS = ["chicken", "shungite", "copium", "bajcoin"];

export const CHART_COLORS = {
  GREEN: "rgba(130, 240, 145, 1)",
  RED: "rgba(255, 134, 159, 1)",
  BLUE: "rgba(98,  182, 239, 1)",
  ORANGE: "rgba(255, 177, 101, 1)",
  PURPLE: "rgba(170, 128, 252, 1)",
  YELLOW: "rgba(255, 218, 128, 1)",
  CYAN: "rgba(113, 255, 240, 1)",
  GRAY: "rgba(129, 129, 117, 1)",
};

export const CHART_BG = Object.keys(CHART_COLORS).reduce((obj, key) => {
  obj[key] = CHART_COLORS[key].replace("1)", "0.5)");
  return obj;
}, {});

export const TABLE_BG = Object.keys(CHART_COLORS).reduce((obj, key) => {
  obj[key] = CHART_COLORS[key].replace("1)", "0.1)");
  return obj;
}, {});

export const COMMAND_COLORS = Object.keys(CHART_COLORS).slice(0, COMMANDS.length);
COMMAND_COLORS[COMMAND_COLORS.length - 1] = "GRAY"; // "Other" is always gray

export const COMMON_COLOR_KEYS = {
  Win: "GREEN",
  Draw: "YELLOW",
  Lost: "RED",
  Gain: "GREEN",
  Nil: "YELLOW",
  Loss: "RED",
  Lose: "RED",
};
export const STOCKS_COLOR_MAP = STOCKS.reduce((m, s, i) => {
  m[s] = COMMAND_COLORS[i];
  return m;
}, {});

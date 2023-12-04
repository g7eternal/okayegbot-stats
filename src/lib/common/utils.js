import { CHART_BG, CHART_COLORS } from "$lib/common/consts.js";

export function makeGenericDataElement(label, count, colorName) {
  return {
    label: label,
    data: [count],
    borderWidth: 2,
    backgroundColor: CHART_BG[colorName],
    borderColor: CHART_COLORS[colorName],
  };
}

function getOrCreateTooltip(chart) {
  return bootstrap.Tooltip.getOrCreateInstance(chart.canvas.parentNode, {
    animation: true,
    boundary: document.body,
    html: true,
    title: "-",
    //trigger: "manual",
  });
}

export const tooltipInitPlugin = {
  id: "customTooltipInitPlugin",
  afterInit: function (chart) {
    getOrCreateTooltip(chart);
  },
  afterDestroy: function (chart) {
    const t = bootstrap.Tooltip.getInstance(chart);
    if (t) t.dispose();
  },
};

export function emergencyDestroyAllTooltips() {
  // todo: consider removing this and use actual events or something
  document.querySelectorAll("canvas").forEach((canvas) => {
    try {
      const t = bootstrap.Tooltip.getInstance(canvas.parentNode);
      if (t) t.dispose();
    } catch (e) {
      // do nothing, skip
    }
  });
}

export const externalTooltipHandler = (context) => {
  const { chart, tooltip } = context;

  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    return;
  }

  // Update content
  if (tooltip.body) {
    const bodyLines = tooltip.body.map((b) => b.lines);

    const content = document.createElement("div");

    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const box = document.createElement("span");
      box.style.background = colors.backgroundColor;
      box.style.borderColor = colors.borderColor;
      box.style.borderWidth = "2px";
      box.style.marginRight = "10px";
      box.style.height = "10px";
      box.style.width = "10px";
      box.style.display = "inline-block";
      box.style.boxShadow = "0px 0px 2px black";

      const row = document.createElement("div");

      const label = document.createElement("strong");
      label.innerText = body;

      row.appendChild(box);
      row.appendChild(label);
      content.appendChild(row);
    });

    tooltipEl.setContent({ ".tooltip-inner": content });
  }
};

import 'styles/FloorVarChart/floorVarChart.scss';

const getOrCreateTooltip = (chart, tooltip) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');
  const tooltipData = tooltip?.dataPoints?.at(0)?.raw;

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'custom__floorvar__tooltip';
  }

  tooltipEl.innerHTML = `
      <span>${tooltipData?.price}</span>
      <span>${tooltipData?.timestamp} AM</span>
    `;

  chart.canvas.parentNode.appendChild(tooltipEl);

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart, tooltip);
  const chartBottom = chart.chartArea.bottom;
  const y = chart.tooltip.caretY - 50;

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  tooltipEl.style.height = chartBottom - y + 'px';

  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY - 45 + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

export default externalTooltipHandler;

import 'styles/largeChart/largeChartCustomTooltip.scss';

const getOrCreateTooltip = (chart, tooltip) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');
  const tooltipData = tooltip?.dataPoints?.at(0)?.raw;

  const data = JSON.parse(localStorage.getItem('selected')).filter(
    (item) => item.color !== '#AB7CE1'
  );

  const count =
    data &&
    data.reduce(function (a, s) {
      return (a += s.count);
    }, 0);

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'long_chart_custom__tooltip';
  }

  tooltipEl.innerHTML = `
      <div class="tooltip__container">
        <div class="tooltip__head">
          <span>Price: ${tooltipData?.price}</span>
          <span>Count: ${tooltipData?.count}</span>
        </div>
        <div class="tooltip__body">
          <div class="tooltip__bottom_value">
            <span>Count</span>
            <span>${tooltipData?.count}</span>
          </div>
          <div class="tooltip__bottom_value">
            <span>Cumulative</span>
            <span>${count}</span>
          </div>
        </div>
      </div>
    `;

  chart.canvas.parentNode.appendChild(tooltipEl);

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart, tooltip);

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY - tooltip.height * 2 + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

export default externalTooltipHandler;

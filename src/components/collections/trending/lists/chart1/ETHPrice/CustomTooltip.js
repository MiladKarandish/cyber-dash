import 'styles/ETHPriceChart/ETHPrice.scss';

const getOrCreateTooltip = (chart, tooltip) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');
  const tooltipData = tooltip?.dataPoints?.at(0)?.raw;

  const getTime = (timestamp) => {
    const time = new Date(+timestamp);

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const formattedTime =
      months[time.getMonth()] +
      ' ' +
      time.getDay() +
      ', ' +
      time.getFullYear() +
      ' ' +
      time.getHours() +
      ':' +
      time.getMinutes();

    return formattedTime;
  };

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'custom__tooltip';
  }

  tooltipEl.innerHTML = `
      <span>${getTime(tooltipData?.timestamp)}</span>
      <span>Price: ${tooltipData?.price} ETH</span>
      <span>Token id: ${tooltipData?.tokenId}</span>
      <span>Rank: ${tooltipData?.rank}</span>
      <img src=${tooltipData?.img} alt="" />
      <div class="bottom__thing_container">
        <div class="bottom__thing"></div>
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
  tooltipEl.style.top = positionY + tooltip.caretY - 108 * 2 + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

export default externalTooltipHandler;

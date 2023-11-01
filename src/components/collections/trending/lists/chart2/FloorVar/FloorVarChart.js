import { useContext, useEffect, useRef, useState } from 'react';
import 'styles/FloorVarChart/floorVarChart.scss';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import externalTooltipHandler from './FloorVarCustomTooltip';
import CollectionContext from 'contexts/collectionContext';

const FloorVarChart = ({
  type,
  isOutliers,
  timeFrame,
  floorPrice = 5,
  floorVar
}) => {
  type = 'listings';
  const { collectionData } = useContext(CollectionContext);
  const [data, setData] = useState(null);
  const [flooredData, setFlooredData] = useState([
    {
      price: 10
    },
    {
      price: 1
    },
    {
      price: 2
    },
    {
      price: 15
    },
    {
      price: 3
    }
  ]);
  const [xAxisLabels, setXAxisLabels] = useState(null);
  const [minMax, setMinMax] = useState(0);

  const getTime = (timestamp) => {
    const hours = new Date(+timestamp).getHours();

    return hours;
  };

  const plugin = {
    id: 'chartAreaBorder',
    afterDraw: (chart, args, opts) => {
      const ctx = chart.ctx,
        x = chart.tooltip.caretX,
        y = chart.tooltip.caretY,
        chartBottom = chart.chartArea.bottom,
        chartLeft = chart.chartArea.left;

      const {
        chartArea: { top, left, width, height }
      } = chart;
      const {
        borders: { tLtR, tLbL, tRbR, bLbR }
      } = opts;

      if (chart.tooltip._active && chart.tooltip._active.length) {
        // draw line Y
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([3, 5]);
        ctx.moveTo(x, y);
        ctx.lineTo(x, chartBottom);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#1E2134';
        ctx.stroke();
        ctx.restore();

        // draw line X
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([3, 5]);
        ctx.moveTo(x, y);
        ctx.lineTo(chartLeft, y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#1E2134';
        ctx.stroke();

        ctx.restore();
      }

      ctx.save();
      if (tLtR && tLtR.borderWidth !== 0) {
        ctx.beginPath();
        ctx.strokeStyle = tLtR.borderColor || Chart.defaults.color;
        ctx.lineWidth = tLtR.borderWidth || 0;
        ctx.borderStyle = tLtR.borderDash || [];
        ctx.borderTopWidth = tLtR.borderTopWidth || 0;
        ctx.setLineDash(tLtR.borderDash || []);
        ctx.lineDashOffset = tLtR.borderDashOffset || 0;
        ctx.moveTo(left, top);
        ctx.lineTo(left + width, top);
        ctx.stroke();
      }

      if (tLbL && tLbL.borderWidth !== 0) {
        ctx.beginPath();
        ctx.strokeStyle = tLbL.borderColor || Chart.defaults.color;
        ctx.lineWidth = tLbL.borderWidth || 0;
        ctx.borderStyle = tLbL.borderDash || [];
        ctx.borderTopWidth = tLbL.borderTopWidth || 0;
        ctx.setLineDash(tLbL.borderDash || []);
        ctx.lineDashOffset = tLbL.borderDashOffset || 0;
        ctx.moveTo(left, top);
        ctx.lineTo(left, top + height);
        ctx.stroke();
      }

      if (tRbR && tRbR.borderWidth !== 0) {
        ctx.beginPath();
        ctx.strokeStyle = tRbR.borderColor || Chart.defaults.color;
        ctx.lineWidth = tRbR.borderWidth || 0;
        ctx.borderStyle = tRbR.borderDash || [];
        ctx.borderTopWidth = tRbR.borderTopWidth || 0;
        ctx.setLineDash(tLbL.borderDash || []);
        ctx.lineDashOffset = tRbR.borderDashOffset || 0;
        ctx.moveTo(left + width, top);
        ctx.lineTo(left + width, top + height);
        ctx.stroke();
      }

      if (bLbR && bLbR.borderWidth !== 0) {
        ctx.beginPath();
        ctx.strokeStyle = bLbR.borderColor || Chart.defaults.color;
        ctx.lineWidth = bLbR.borderWidth || 0;
        ctx.borderStyle = bLbR.borderDash || [];
        ctx.borderTopWidth = bLbR.borderTopWidth || 0;
        ctx.setLineDash(bLbR.borderDash || []);
        ctx.lineDashOffset = bLbR.borderDashOffset || 0;
        ctx.moveTo(left, top + height);
        ctx.lineTo(left + width, top + height);
        ctx.stroke();
      }

      ctx.restore();
    }
  };

  useEffect(() => {
    if (collectionData && collectionData[type]) {
      if (timeFrame) {
        const time = +timeFrame.split(' ')[0];

        // console.log(time);
        const convertMinsToHrsMins = (mins) => {
          let h = Math.floor(mins / 60);
          let m = mins % 60;
          h = h < 10 ? '0' + h : h; // (or alternatively) h = String(h).padStart(2, '0')
          m = m < 10 ? '0' + m : m; // (or alternatively) m = String(m).padStart(2, '0')
          return `${h}:${m}`;
        };

        const date = new Date();
        const currentTime = date.getHours() * 60 + date.getMinutes();

        const targetTime = +time * 60;

        const finalTimeRef = ((+currentTime - +targetTime) / 60)
          .toString()
          .split('.');
        const finalHours = finalTimeRef[0];
        const finalMinutes = Math.ceil((finalTimeRef[1] * 60) / 100)
          .toString()
          .replace(/^0+(\d)|(\d)0+$/gm, '$1$2');

        const finalTime =
          ('0' + finalHours).slice(-2) + ':' + ('0' + finalMinutes).slice(-2);

        const wantedTime = new Date(`${date.toDateString()} ${finalTime}`);
        // console.log(wantedTime);

        //   var diff = date.getTime() - wantedTime.getTime();

        //   var msec = diff;
        //   var hh = Math.floor(msec / 1000 / 60 / 60);
        //   msec -= hh * 1000 * 60 * 60;
        //   var mm = Math.floor(msec / 1000 / 60);
        //   msec -= mm * 1000 * 60;

        //   console.log(hh + ':' + mm);
      }

      if (flooredData) {
        setData({
          above: flooredData
            .filter((item) => +item.price >= +floorPrice)
            .map((i) => +i.price),
          below: flooredData
            .filter((item) => +item.price <= +floorPrice)
            .map((i) => +i.price)
        });
      } else {
        setData({ above: [], below: [] });
      }
    }
  }, [collectionData, isOutliers, timeFrame, type, flooredData, floorPrice]);

  useEffect(() => {
    if (floorVar) {
      const floor = floorVar?.split(' ');
      const unit = floor.filter((item) => !parseInt(item))[0];
      let max = null;
      let min = null;
      if (unit === 'X') {
        min = parseInt(floor[1]) * floorPrice;
        max = parseInt(floor[2]) * floorPrice;

        setFlooredData(
          collectionData[type].filter(
            (item) => +item.price <= max && +item.price >= min
          )
        );
      } else {
        min = parseInt(floor[0]);
        max = parseInt(floor[1]);

        collectionData &&
          setFlooredData(
            collectionData[type]?.filter(
              (item) =>
                +Math.floor((+item.price / floorPrice) * 100) <= max &&
                +Math.floor((+item.price / floorPrice) * 100) >= min
            )
          );
      }
    }
  }, [collectionData, floorPrice, floorVar, type]);

  useEffect(() => {
    if (data && data.above) {
      setMinMax({
        min: Math.min(...[...data.above, ...data.below]),
        max: Math.max(...[...data.above, ...data.below])
      });
    }
  }, [data]);

  return (
    <div className="floor__container">
      <Chart
        style={{ paddingLeft: '0' }}
        type="line"
        data={{
          labels: ['6:55 AM', '9:55 AM', '10:55 AM', '11:55 AM', '12:55 AM'],

          datasets: [
            {
              label: false,
              data: data?.above,
              fill: false,
              cubicInterpolationMode: 'monotone',
              tension: 0.4,
              borderColor: '#27AF52',
              pointBackgroundColor: '#244677',
              pointHoverBackgroundColor: '#244677ff',
              pointRadius: 0,
              pointHoverRadius: 7,
              pointHoverBorderWidth: 8,
              pointHoverBorderColor: 'rgb(100,100,100, 0.3)',
              hoverBorderJoinStyle: 'bevel'
            },
            {
              label: false,
              data: [+floorPrice],
              fill: false,
              cubicInterpolationMode: 'monotone',
              tension: 0.4,
              borderColor: '#FD8F25',
              pointBackgroundColor: '#244677',
              pointHoverBackgroundColor: '#244677ff',
              pointRadius: 5,
              pointHoverRadius: 7,
              pointHoverBorderWidth: 8,
              pointHoverBorderColor: 'rgb(100,100,100, 0.3)',
              hoverBorderJoinStyle: 'bevel'
            },
            {
              label: false,
              data: data?.below,
              fill: false,
              cubicInterpolationMode: 'monotone',
              tension: 0.4,
              borderColor: '#FD2F7A',
              pointBackgroundColor: '#244677',
              pointHoverBackgroundColor: '#244677ff',
              pointRadius: 0,
              pointHoverRadius: 7,
              pointHoverBorderWidth: 8,
              pointHoverBorderColor: 'rgb(100,100,100, 0.3)',
              hoverBorderJoinStyle: 'bevel'
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,

          layout: {
            padding: {
              bottom: 40
            }
          },

          scales: {
            x: {
              offset: true,
              grid: {
                display: false,
                lineWidth: 0,
                color: '#244677',
                tickWidth: 0
                // tickLength: 0,
                // padding: 30,
              },
              ticks: {
                callback: function (val) {
                  return this.getLabels()[val];
                }
              },
              min: 0,
              beginAtZero: true
            },

            y: {
              grid: {
                color: '#244677',
                lineWidth: 2,
                tickWidth: 0,
                drawBorder: false,
                drawOnChartArea: true
              },

              ticks: {
                stepSize: 2
              }
              // max: minMax.max,
              // min: minMax.min,
              // beginAtZero: true,
            }
          },

          plugins: {
            tooltip: {
              enabled: false,
              position: 'average',
              external: externalTooltipHandler
            },

            legend: { display: false },

            chartAreaBorder: {
              borders: {
                tLtR: {
                  borderWidth: 5,
                  borderColor: '#0b1e39'
                },
                tLbL: {
                  borderWidth: 0,
                  borderColor: '#244677'
                },
                tRbR: {
                  borderTopWidth: 0,
                  borderColor: 'transparent',
                  lineDashOffset: 5
                },
                bLbR: {
                  borderWidth: 0,
                  borderColor: '#244677'
                }
              }
            }
          }
        }}
        plugins={[plugin]}
      />

      <span className="ETH__hider_bottom"></span>
      <span className="ETH__hider_top"></span>
    </div>
  );
};

export default FloorVarChart;

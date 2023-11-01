import { useContext, useEffect, useRef, useState } from 'react';
import 'styles/ETHPriceChart/ETHPrice.scss';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import externalTooltipHandler from './CustomTooltip';
import CollectionContext from 'contexts/collectionContext';
import outlier from 'outliers';

const LargeChartETHPrice = ({ type, isOutliers, timeFrame, data }) => {
  type = type === 'list' ? 'listings' : 'orders';
  // const { collectionData } = useContext(CollectionContext);
  // const [data, setData] = useState(null);
  // const max = useRef(240);
  const [max, setMax] = useState(20);

  // const getTime = (timestamp) => {
  //   const hours = new Date(+timestamp).getHours();

  //   return hours;
  // };

  const plugin = {
    id: 'chartAreaBorder',
    afterDraw: (chart, args, opts) => {
      const {
        chartArea: { top, left, width, height },
        ctx,
      } = chart;
      const {
        borders: { tLtR, tLbL, tRbR, bLbR },
      } = opts;

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
    },
  };

  useEffect(() => {
    if (data) setMax(Math.ceil(Math.max(...data.map((item) => item.y))));
  }, [data]);

  // const checkOutliers = (data) => {
  //   const outliers = data.filter(outlier('price'));
  //   const maxPrice = Math.max(...outliers.map((item) => +item.price));
  //   max.current = maxPrice;

  //   setData(
  //     outliers.map((item) => ({
  //       y: +item.price,
  //       x: +getTime(item.timestamp),
  //       img: item.image_url,
  //       price: item.price,
  //       timestamp: item.timestamp,
  //       tokenId: item.token_id,
  //       tokenRank: item.token_rank,
  //     }))
  //   );
  // };

  // useEffect(() => {
  //   if (collectionData && collectionData[type]) {
  //     if (timeFrame) {
  //       const time = +timeFrame.split(' ')[0];

  //       const filteredData = collectionData[type].filter(
  //         (item) =>
  //           getTime(item.timestamp) <= time && {
  //             y: +item.price,
  //             x: +getTime(item.timestamp),
  //             img: item.image_url,
  //             price: item.price,
  //             timestamp: item.timestamp,
  //             tokenId: item.token_id,
  //             tokenRank: item.token_rank,
  //           }
  //       );

  //       const maxPrice = Math.max(...filteredData.map((item) => +item.price));
  //       max.current = maxPrice;

  //       if (isOutliers) {
  //         checkOutliers(filteredData);
  //         return;
  //       }

  //       setData(
  //         filteredData.map((item) => ({
  //           y: +item.price,
  //           x: +getTime(item.timestamp),
  //           img: item.image_url,
  //           price: item.price,
  //           timestamp: item.timestamp,
  //           tokenId: item.token_id,
  //           tokenRank: item.token_rank,
  //         }))
  //       );
  //     } else {
  //       if (isOutliers) {
  //         checkOutliers(collectionData[type]);
  //         return;
  //       }

  //       setData(
  //         collectionData[type].map((item) => ({
  //           y: +item.price,
  //           x: +getTime(item.timestamp),
  //           img: item.image_url,
  //           price: item.price,
  //           timestamp: item.timestamp,
  //           tokenId: item.token_id,
  //           tokenRank: item.token_rank,
  //         }))
  //       );
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [collectionData, isOutliers, timeFrame, type]);

  return (
    <div className='ETH__container'>
      <Chart
        style={{ paddingLeft: '0' }}
        type='scatter'
        data={{
          // labels: ['6:55 AM', '9:55 AM', '10:55 AM', '11:55 AM', '12:55 AM'],

          datasets: [
            {
              label: false,
              data: data,
              pointBackgroundColor: data?.map(
                () => '#' + (((1 << 24) * Math.random()) | 0).toString(16)
              ),
              pointHoverBackgroundColor: '#244677ff',
              pointRadius: 5,
              pointHoverRadius: 7,
              pointHoverBorderWidth: 8,
              pointHoverBorderColor: 'rgb(100,100,100, 0.3)',
              hoverBorderJoinStyle: 'bevel',
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,

          layout: {
            padding: {
              bottom: 40,
            },
          },

          scales: {
            x: {
              type: 'linear',
              offset: true,
              grid: {
                display: true,
                drawBorder: true,
                drawOnChartArea: false,
                lineWidth: 2,
                color: '#244677',
                tickWidth: 0,
                // tickLength: 0,
                // padding: 30,
              },
              ticks: {
                // callback: function (val) {
                //   return this.getLabels()[val];
                // },
              },
              min: 0,
              beginAtZero: true,
            },

            y: {
              type: 'linear',
              grid: {
                color: '#244677',
                lineWidth: 2,
                tickWidth: 0,
                drawBorder: false,
                drawOnChartArea: true,
              },

              ticks: {
                stepSize: 1,
              },
              max: max + 1,
              min: 0,
              // beginAtZero: true,
            },
          },

          plugins: {
            tooltip: {
              enabled: false,
              position: 'average',
              external: externalTooltipHandler,
            },
            legend: { display: false },

            chartAreaBorder: {
              borders: {
                tLtR: {
                  borderWidth: 5,
                  borderColor: '#0b1e39',
                },
                tLbL: {
                  borderWidth: 2,
                  borderColor: '#244677',
                },
                tRbR: {
                  borderTopWidth: 2,
                  borderColor: 'transparent',
                  lineDashOffset: 5,
                },
                bLbR: {
                  borderWidth: 2,
                  borderColor: '#244677',
                },
              },
            },
          },
        }}
        plugins={[plugin]}
      />
      <span className='ETH__hider_bottom'></span>
      <span className='ETH__hider_top'></span>
    </div>
  );
};

export default LargeChartETHPrice;

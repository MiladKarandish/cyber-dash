import ETHPrice from 'components/collections/trending/lists/chart1/ETHPrice/ETHPrice';
import DropDown from 'components/DropDown';
import SwitchJs from 'components/SwitchJs';
import React, { useState } from 'react';

const FirstChart = () => {
  const [activeChart, setActiveChart] = useState('list');
  const [timeFrame, setTimeFrame] = useState('4 Hours');
  const [outliers, setOutliers] = useState(false);

  return (
    <div className='collection__charts first__collection_chart'>
      {/* Titles */}
      <span className='list-sails_title_x'>Time</span>
      <span className='list-sails_title_y'>ETH Price</span>

      <div className='collection__chart_header'>
        <button
          className={activeChart === 'list' ? 'active' : ''}
          onClick={() => setActiveChart('list')}>
          List
        </button>
        <button
          className={activeChart === 'orders' ? 'active' : ''}
          onClick={() => setActiveChart('orders')}>
          Sails
        </button>
      </div>

      <div className='collection__filters'>
        <div className='collection__filters_dropdown'>
          <span className='dropdown_title'>Time Frame</span>
          <DropDown
            fontSize='3rem'
            innerColor='#244677'
            minWidth='111px'
            items={[
              { name: '1 Minutes' },
              { name: '5 Minutes' },
              { name: '15 Minutes' },
              { name: '1 Hours' },
              { name: '4 Hours' },
            ]}
            placeholder={'4 Hours'}
            callBack={(value) => setTimeFrame(value)}
          />
        </div>

        <div className='collection__filters_switches'>
          <div className='collection__filters_toggle'>
            <span>LOG Scale</span>
            <SwitchJs style={{ backgroundColor: '#24467750' }} />
          </div>

          <div className='collection__filters_toggle'>
            <span>OUTLIERS</span>
            <SwitchJs
              style={{ backgroundColor: '#24467750' }}
              onClick={(e) => {
                setOutliers((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>

      <div className='collection__charts_mode'>
        <div>
          <div className='collection__charts_mode_point'></div>
          <span>LEGENDARY</span>
        </div>
        <div>
          <div className='collection__charts_mode_point'></div>
          <span>ULTRA RARE</span>
        </div>
        <div>
          <div className='collection__charts_mode_point'></div>
          <span>RARE</span>
        </div>
        <div>
          <div className='collection__charts_mode_point'></div>
          <span>COMMON</span>
        </div>
      </div>

      <div className='ETHPrice_chart'>
        <ETHPrice
          type={activeChart}
          isOutliers={outliers}
          timeFrame={timeFrame}
        />
      </div>
    </div>
  );
};

export default FirstChart;

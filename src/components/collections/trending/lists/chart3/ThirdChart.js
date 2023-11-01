import ButtonGroup from 'components/ButtonGroup';
import LargeChart from 'components/collections/trending/lists/chart3/LargeChart/LargeChart';
import LargeChartETHPrice from 'components/collections/trending/lists/chart3/LargeChart/LargeChartETHPrice';
import DropDown from 'components/DropDown';
import SwitchJs from 'components/SwitchJs';
import 'styles/collections/mainCollection.scss';
import 'styles/largeChart/largeChart.scss';
import { useState } from 'react';

const ThirdChart = () => {
  const [outliers, setOutliers] = useState(false);
  const [timeFrame, setTimeFrame] = useState('4 Hours');
  const [rarityRank, setRarityRank] = useState(null);
  const [activePriceRange, setActivePriceRange] = useState('%');
  const [priceRange, setPriceRange] = useState(null);
  const [threshold, setThreshold] = useState('');

  const setRarity = (data) => {
    const dataToSet = data.filter((item) => item.color === '#FD8F25');

    setRarityRank(dataToSet);
  };

  return (
    <div className='collection__large_chart collection__charts_container'>
      <div className='collection__filters price_range'>
        <div className='collection__filters_dropdown'>
          <span
            className='dropdown_title'
            style={{ font: 'normal normal bold 12px/14px Roboto' }}>
            Price Range
          </span>
          {activePriceRange === '%' ? (
            <div className='collection__filters_dropdown'>
              <input
                type='number'
                name='threshold'
                id='threshold'
                className='threshold__input'
                placeholder='4545'
              />
            </div>
          ) : (
            <DropDown
              fontSize='3rem'
              innerColor='#244677'
              minWidth='60px'
              items={[
                { name: 'Ξ0.01' },
                { name: 'Ξ0.02' },
                { name: 'Ξ0.05' },
                { name: 'Ξ0.1' },
                { name: 'Ξ0.5' },
                { name: 'Ξ1' },
                { name: 'Ξ2' },
                { name: 'Ξ5' },
              ]}
              placeholder={`5 ${activePriceRange}`}
              callBack={(value) => setPriceRange(value)}
            />
          )}
        </div>

        <div className='collection__filters_toggle'>
          <ButtonGroup
            items={['%', 'Ξ']}
            activeDefault='%'
            callBack={(value) =>
              value !== activePriceRange && setActivePriceRange(value)
            }
          />
        </div>

        <div className='collection__filters_toggle'>
          <span
            style={{
              color: '#D1D1D1',
              font: 'normal normal normal 11px/13px Roboto',
            }}>
            OUTLIERS
          </span>
          <SwitchJs
            style={{ backgroundColor: '#24467750' }}
            onClick={(e) => {
              setOutliers((prev) => !prev);
            }}
          />
        </div>

        <div className='collection__filters_dropdown large_chart_time_frame'>
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

        <div className='collection__filters_dropdown'>
          <span className='dropdown_title'>Threshold</span>
          {console.log(threshold)}
          <input
            type='number'
            name='threshold'
            id='threshold'
            className='threshold__input'
            placeholder={threshold}
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />
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
      </div>

      <div className='charts'>
        <div className='collection__charts'>
          {/* Titles */}
          <span className='list-sails_title_x'>Price</span>
          <span className='list-sails_title_y'>Count</span>

          <div className='ETHPrice_chart'>
            <LargeChart
              type={'list'}
              isOutliers={outliers}
              timeFrame={timeFrame}
              callBack={setRarity}
              step={priceRange}
              handleThreshold={setThreshold}
              threshold={threshold}
            />
          </div>
        </div>

        {/*  */}
        <div className='collection__charts'>
          {/* Titles */}
          <span className='list-sails_title_x'>Rarity Rank</span>
          <span className='list-sails_title_y'>Price in ETH</span>

          <div className='ETHPrice_chart'>
            <LargeChartETHPrice
              type={'list'}
              isOutliers={outliers}
              timeFrame={timeFrame}
              data={rarityRank}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdChart;

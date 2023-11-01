import FloorVarChart from 'components/collections/trending/lists/chart2/FloorVar/FloorVarChart';
import DropDownFloorVar from 'components/collections/trending/lists/chart2/FloorVar/FloorVarDropdown';
import DropDown from 'components/DropDown';
import React, { useState } from 'react';

const SecondChart = ({
  data = {
    floorData: 5
  }
}) => {
  const [activeChart, setActiveChart] = useState('list');
  const [timeFrame, setTimeFrame] = useState('4 Hours');
  const [outliers, setOutliers] = useState(false);
  const [floorVar, setFloorVar] = useState('null');
  const [floorTimeFrame, setFloorTimeFrame] = useState('4 Hours');

  return (
    <div className="collection__charts collection__second_chart_container">
      {/* Titles */}
      <span
        className="list-sails_title_x"
        style={{ transform: 'translateX(-50%)' }}>
        Time Period
      </span>
      <span className="list-sails_title_y">Count</span>

      <div className="collection__chart_header">
        <button
          className={activeChart === 'list' ? 'active' : ''}
          onClick={() => setActiveChart('list')}>
          List
        </button>
        <button
          className={activeChart === 'orders' ? 'active' : ''}
          onClick={() => setActiveChart('orders')}>
          Delist
        </button>
      </div>

      <div className="collection__filters second__chart">
        <div className="collection__filters_dropdown">
          <span className="dropdown_title">Floor Var</span>
          {/* {console.log(metaData)} */}
          <DropDownFloorVar
            fontSize="3rem"
            innerColor="#244677"
            minWidth="111px"
            callBack={(value) => setFloorVar(value)}
          />
        </div>

        <div className="collection__filters_dropdown">
          <span className="dropdown_title">Time Frame</span>
          <DropDown
            fontSize="3rem"
            innerColor="#244677"
            minWidth="111px"
            items={[
              { name: '1 Minutes' },
              { name: '5 Minutes' },
              { name: '15 Minutes' },
              { name: '1 Hours' },
              { name: '4 Hours' }
            ]}
            placeholder={'4 Hours'}
            callBack={(value) => setFloorTimeFrame(value)}
          />
        </div>
      </div>

      <div className="collection__charts_mode">
        <div>
          <div
            className="collection__charts_mode_point"
            style={{ backgroundColor: '#27AF52' }}></div>
          <span>ABOVE FLOOR</span>
        </div>
        <div>
          <div
            className="collection__charts_mode_point"
            style={{ backgroundColor: '#FD2F7A' }}></div>
          <span>BELOW FLOOR</span>
        </div>
        <div>
          <div
            className="collection__charts_mode_point"
            style={{ backgroundColor: '#FD8F25' }}></div>
          <span>SALES</span>
        </div>
      </div>

      <div className="ETHPrice_chart">
        {data && (
          <FloorVarChart
            type={activeChart}
            isOutliers={outliers}
            timeFrame={floorTimeFrame}
            floorPrice={data.floor_price}
            floorVar={floorVar}
          />
        )}
      </div>
    </div>
  );
};

export default SecondChart;

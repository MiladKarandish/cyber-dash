import 'styles/collections/collectionOfficials.scss';
import 'styles/collections/mainCollection.scss';
import ETHPrice from 'components/collections/trending/lists/chart1/ETHPrice/ETHPrice';
import SwitchJs from 'components/SwitchJs';
import Timer from 'components/Timer';
import { useState } from 'react';

const BoredApe = () => {
  const [timeFrame, setTimeFrame] = useState('4 Hours');

  return (
    <div className="collection" style={{ width: '100%' }}>
      <div className="collection__charts_container" style={{ width: '90%' }}>
        <div className="collection__charts" style={{ width: '100%' }}>
          <div className="collection__filters">
            <div className="collection__filters_dropdown">
              <Timer
                items={['1h', '2h', '3h']}
                setActiveTimeFrame={setTimeFrame}
              />
            </div>

            <div className="collection__filters_toggle">
              <span>LOG Scale</span>
              <SwitchJs style={{ backgroundColor: '#24467750' }} />
            </div>

            <div className="collection__filters_toggle">
              <span>OUTLIERS</span>
              <SwitchJs
                style={{ backgroundColor: '#24467750' }}
                // onClick={(e) => {
                //   setOutliers((prev) => !prev);
                // }}
              />
            </div>

            <div className="collection__filters_dropdown">
              <Timer
                items={['1h', '2h', '3h']}
                setActiveTimeFrame={setTimeFrame}
              />
            </div>
          </div>

          <div
            className="collection__charts_mode"
            style={{
              transform: 'translateY(20px)',
              width: '84%',
              whiteSpace: 'pre'
            }}>
            <div>
              <div className="collection__charts_mode_point"></div>
              <span>LEGENDARY</span>
            </div>
            <div>
              <div className="collection__charts_mode_point"></div>
              <span>ULTRA RARE</span>
            </div>
            <div>
              <div className="collection__charts_mode_point"></div>
              <span>RARE</span>
            </div>
            <div>
              <div className="collection__charts_mode_point"></div>
              <span>COMMON</span>
            </div>
          </div>

          <div className="ETHPrice_chart">
            <ETHPrice
              type={'activeChart'}
              isOutliers={'outliers'}
              timeFrame={'timeFrame'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoredApe;

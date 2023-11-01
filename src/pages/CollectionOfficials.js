import 'styles/collections/collectionOfficials.scss';
import 'styles/collections/mainCollection.scss';
import CollectionBox from 'components/collections/trending/InfoBox';
import ETHPrice from 'components/collections/trending/lists/chart1/ETHPrice/ETHPrice';
import SwitchJs from 'components/SwitchJs';
import DropDown from 'components/DropDown';
import { CollectionContextProvider } from 'contexts/collectionContext';
import Timer from 'components/Timer';

const CollectionOfficials = () => {
  return (
    <CollectionContextProvider>
      <div className='collection'>
        <h1 className='collection__title'>APIENS OFFICIALS</h1>

        <CollectionBox />

        <div className='collection__switch'>
          <div>
            <span>Trading Dashboard</span>
          </div>
          <div>
            <span>Analytical Charts</span>
          </div>
        </div>

        <div className='collection__charts_container' style={{ width: '90%' }}>
          <div className='collection__charts' style={{ width: '100%' }}>
            <div className='collection__chart_header'></div>

            <div className='collection__filters'>
              <div className='collection__filters_dropdown'>
                <Timer items={['1h', '2h', '3h']} />
              </div>

              <div className='collection__filters_toggle'>
                <span>LOG Scale</span>
                <SwitchJs style={{ backgroundColor: '#24467750' }} />
              </div>

              <div className='collection__filters_toggle'>
                <span>OUTLIERS</span>
                <SwitchJs
                  style={{ backgroundColor: '#24467750' }}
                  // onClick={(e) => {
                  //   setOutliers((prev) => !prev);
                  // }}
                />
              </div>

              <div className='collection__filters_dropdown'>
                <Timer items={['1h', '2h', '3h']} />
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
                type={'activeChart'}
                isOutliers={'outliers'}
                timeFrame={'timeFrame'}
              />
            </div>
          </div>
        </div>
      </div>
    </CollectionContextProvider>
  );
};

export default CollectionOfficials;

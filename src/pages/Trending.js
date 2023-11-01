import { useEffect, useState } from 'react';
import 'styles/trending.scss';
import ButtonGroup from 'components/ButtonGroup';
import Timer from 'components/Timer';
import { ReactComponent as FilterIcon } from 'assets/icons/filtr.svg';
import Filter from 'components/Filter';
import TrendingTable from 'components/trending/TrendingTable';
import { TRENDING_DATA } from 'data';

const timeFrameMoreThan1Day = ['1d', '7d'];
const timeFrameLessThan1Day = ['1m', '5m', '15m', '1h', '6h', '12h'];

const Traits = () => {
  // const [data, setData] = useState(null);
  const [openFilter, setOpenFiter] = useState(false);
  const [sort, setSort] = useState('High/Low');
  const [activeTimeFrame, setActiveTimeFrame] = useState('1h');
  const loading = false;

  const onClick = (e) => {
    setOpenFiter((prev) => !prev);
  };

  const activeButtonsChange = (value) => {
    setSort(value);
  };

  const closer = () => {
    setOpenFiter(false);
  };

  // const fetchData = (time) => {
  //   const fetcher = async () => {
  //     const res = await fetch(
  //       `https://api.cyberdash.app/v1/tables/trending/ticker/${time}`
  //     )

  //     const data = await res.json()

  //     setData(data)
  //   }

  //   fetcher()
  // }

  useEffect(() => {
    // fetchData('1h');

    const closer = (e) => {
      if (!e.target.closest('.filter') && e.target.id !== 'filter') {
        setOpenFiter(false);
      }
    };

    window && window.addEventListener('mouseup', closer);

    return () => {
      window.removeEventListener('mouseup', closer);
    };
  }, []);

  return (
    <div className="traits">
      {openFilter && <Filter callBack={closer} />}
      <div className="traits__title">
        <h2>Trending NFT Collections</h2>
        <p>See what's selling and listing in real time!</p>
      </div>

      <div className="traist__sort_timer">
        <div className="traits__sort-details">
          <span>Sorted By: </span>
          <ButtonGroup
            items={['High/Low', '%Change']}
            activeDefault="High/Low"
            font="normal normal bold 12px/14px Roboto"
            containerStyles={{
              border: '1px solid #1956E2',
              height: '30px',
              minWidth: '23rem'
            }}
            callBack={activeButtonsChange}
          />
        </div>

        <div className="timers__filter__container">
          <div className="traits__timers">
            <Timer
              // callBack={fetchData}
              items={timeFrameMoreThan1Day}
              activeTimeFrame={activeTimeFrame}
              setActiveTimeFrame={setActiveTimeFrame}
            />
            <Timer
              // callBack={fetchData}
              items={timeFrameLessThan1Day}
              activeTimeFrame={activeTimeFrame}
              setActiveTimeFrame={setActiveTimeFrame}
            />
          </div>

          <div id="filter" onClick={onClick}>
            <FilterIcon />
          </div>
        </div>
      </div>

      <div className="table__container">
        {<TrendingTable data={TRENDING_DATA?.rows} sort={sort} info={true} />}
      </div>
    </div>
  );
};

export default Traits;

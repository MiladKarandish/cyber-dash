import { useNavigate } from 'react-router-dom';
import 'styles/customTable/customTable.scss';
import 'styles/trending/trendingTable.scss';
import { ReactComponent as InfoIcon } from 'assets/images/information.svg';
import { ReactComponent as FlashDownIcon } from 'assets/images/flash-down.svg';
import { ReactComponent as FlashDownIconGreen } from 'assets/images/flash-down_green.svg';
import { ReactComponent as FlashUpIconRed } from 'assets/images/flash_up_red.svg';
import { ReactComponent as FlashUpIcon } from 'assets/images/flash_up.svg';

import Tooltip from 'components/Tooltip';
import { useEffect, useState } from 'react';

const headerItemsInof = [
  'The collections with the highest number of sales in the selected timeframe',
  'Floor price on Opensea',
  'The number of sales',
  'The number of listings',
  'The trading volume of Collections in the selected timeframe',
  'The total volume of collections from the beginning until now'
];

let headers = [
  'Collection',
  'Floor',
  'Saies',
  'Listings',
  'Volume',
  'Market Cap'
];
const spaces = [40, 20, 20, 20, 20, 13];

const timestampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.getDay() + ' days ago';
};

const defData = [
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa',
  'sdfasdfa'
];

// const randomNumbers = [
//   -1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -6, 6, -7, 7, -8, 8, -9, 9, -1, 10, -11,
//   11, -12, 12, -13, 13, -14, 14, -15, 15, -16, 16, -17, 17, -18, 18, -19, -19
// ];

const TrendingTable = ({ data = defData, sort, info }) => {
  const navigator = useNavigate();
  const [rerender, setRerender] = useState(false);
  const min_number = -100;
  const max_number = 100;

  const getNumber = () =>
    Math.round(Math.random() * (max_number - min_number) + min_number);

  const redirectCargo = (item) => {
    navigator(`/collection/${item.collection_slug}`);
  };

  // setTimeout(() => {
  //   setRerender((prev) => !prev);
  // }, 3000);

  useEffect(() => {
    const interval = setInterval(() => {
      setRerender((prev) => !prev);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`m__table__container trending__table`}>
      <ul className="m__table">
        <li className="table__header">
          {headers.map((item, index) => (
            <div
              key={index}
              className="col head_items"
              style={{ flexBasis: `${spaces[index]}%` }}>
              {item} {info && <InfoIcon />}
              <Tooltip title="What is it?" message={headerItemsInof[index]} />
            </div>
          ))}
        </li>
        {data[0].collection_name
          ? data.map((item, index) => {
              const floor = `${getNumber()}`;
              const sales = `${getNumber()}`;
              const listings = `${getNumber()}`;
              const volume = `${getNumber()}`;
              const cap = `${getNumber()}`;

              return (
                <li
                  key={index}
                  className={`table__row`}
                  onClick={redirectCargo.bind(null, item)}>
                  <div className="col" style={{ flexBasis: `${spaces[0]}%` }}>
                    <div className="table__details">
                      <img src={item.image_url} alt="" className="skeleton" />
                      <div>
                        <span className="table__details_nftName">
                          <span>{item.collection_name}</span>
                        </span>
                        {/* <span className="table__details_time">
                    <span>{timestampToDate(item.created_date)}</span>
                  </span> */}
                      </div>
                    </div>
                  </div>

                  {/*  */}
                  <div className="col" style={{ flexBasis: `${spaces[1]}%` }}>
                    <div className="table__changes">
                      {sort === 'High/Low' ? (
                        <>
                          <span>{floor}</span>
                          <span
                            className={
                              +floor.split(' ')[0] > 0 ? 'green' : 'red'
                            }>
                            {+floor.split(' ')[0] > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {floor.replace('-', '')}
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className={
                              +floor.split(' ')[0] > 0 ? 'green' : 'red'
                            }>
                            {+floor.split(' ')[0] > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {floor.replace('-', '')}
                          </span>
                          <span>{floor}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/*  */}
                  <div className="col" style={{ flexBasis: `${spaces[2]}%` }}>
                    <div className="table__changes">
                      {sort === 'High/Low' ? (
                        <>
                          <span>{sales}</span>
                          <span
                            className={
                              +sales.split(' ')[0] > 0 ? 'green' : 'red'
                            }>
                            {+sales.split(' ')[0] > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {sales.replace('-', '')}
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className={
                              +sales.split(' ')[0] > 0 ? 'green' : 'red'
                            }>
                            {+sales.split(' ')[0] > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {sales.replace('-', '')}
                          </span>
                          <span>{item.sales}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/*  */}
                  <div className="col" style={{ flexBasis: `${spaces[3]}%` }}>
                    <div className="table__changes">
                      {sort === 'High/Low' ? (
                        <>
                          <span>{listings}</span>
                          <span
                            className={
                              +listings.split(' ')[0] > 0 ? 'red' : 'green'
                            }>
                            {+listings.split(' ')[0] > 0 ? (
                              <FlashUpIconRed />
                            ) : (
                              <FlashDownIconGreen />
                            )}
                            {listings.replace('-', '')}
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className={
                              +listings.split(' ')[0] > 0 ? 'green' : 'red'
                            }>
                            {+listings.split(' ')[0] > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {listings.replace('-', '')}
                          </span>
                          <span>{item.listings}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/*  */}
                  <div className="col" style={{ flexBasis: `${spaces[4]}%` }}>
                    <div className="table__changes">
                      {sort === 'High/Low' ? (
                        <>
                          <span>{volume}</span>
                          <span
                            className={
                              +volume.split(' ')[0] > 0 ? 'green' : 'red'
                            }>
                            {+volume.split(' ')[0] > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {volume.replace('-', '')}
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className={
                              +volume.split(' ')[0] > 0 ? 'green' : 'red'
                            }>
                            {+volume.split(' ')[0] > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {volume.replace('-', '')}
                          </span>
                          <span>{item.volume}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/*  */}
                  <div className="col" style={{ flexBasis: `${spaces[5]}%` }}>
                    <div className="table__changes">
                      {sort === 'High/Low' ? (
                        <>
                          <span>{cap}</span>
                          <span
                            className={
                              +cap.split(' ')[0] > 0 ? 'green' : 'red'
                            }>
                            {+cap.split(' ')[0] > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {cap.replace('-', '')}
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className={
                              +cap.split(' ')[0] > 0 ? 'green' : 'red'
                            }>
                            {+cap.split(' ')[0] > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {cap.replace('-', '')}
                          </span>
                          <span>{item.market_cap}</span>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })
          : data.map((item, index) => (
              <li
                key={index}
                className={`table__row skeleton-container`}
                onClick={redirectCargo.bind(null, item)}>
                <div className="col" style={{ width: '100%' }}>
                  <div className="table__details" style={{ width: '100%' }}>
                    <img src={item.image_url} alt="" className="skeleton" />
                    <div style={{ width: '100%' }}>
                      <span
                        className="table__details_time"
                        style={{ width: '100%' }}>
                        <div
                          className="skeleton skeleton-text"
                          style={{ width: '99%', marginBottom: '1rem' }}></div>
                      </span>
                      <span
                        className="table__details_nftName"
                        style={{ width: '100%' }}>
                        <div
                          className="skeleton skeleton-text"
                          style={{ width: '90%' }}></div>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TrendingTable;

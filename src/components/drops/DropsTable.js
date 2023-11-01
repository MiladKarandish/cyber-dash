import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/drops/dropsTable.scss';
// import "styles/customTable/customTableTrending.scss";
import { ReactComponent as InfoIcon } from 'assets/images/information.svg';
import { ReactComponent as FlashDownIcon } from 'assets/images/flash-down.svg';
import { ReactComponent as FlashUpIcon } from 'assets/images/flash_up.svg';
import { ReactComponent as DiscordIcon } from 'assets/images/table-discord.svg';
import { ReactComponent as TwitterIcon } from 'assets/images/table-twitter.svg';
import { ReactComponent as WorldIcon } from 'assets/images/table-world.svg';
import { ReactComponent as ArrowIcon } from 'assets/images/table-arrow.svg';
import Tooltip from 'components/Tooltip';

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
  'Supply',
  'Twitter Member',
  'Discord Member',
  'Presale Price',
  'Public Sale Price',
  'Max Mint',
  'Presale Mint Time',
  'Public Sale Mint Time',
  'Category',
  'Social Media'
];
const spaces = [60, 15, 15, 15, 13, 13, 20, 13, 20, 20, 20, 20];

const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index)
];

const DropsTable = ({ data = [], sort, info, area, reveal }) => {
  const navigate = useNavigate();
  // const [open, setOpen] = useState('');=
  const [category, setCategory] = useState(null);
  // const [maxMint, setMaxMint] = useState('');

  if (reveal) {
    if (!headers.includes('Reveal')) {
      headers = insert(headers, 9, 'Reveal');
    }
  } else {
    if (headers.includes('Reveal'))
      headers = headers.filter((item) => item !== 'Reveal');
  }

  const GetTime = ({ timeStamp }) => {
    const today = +new Date().getTime() / 1000;

    const date = +timeStamp;

    // setInterval(() => {
    const currDate = new Date();
    // const year = date.getFullYear() - currDate.getFullYear();

    // const month = date.getMonth() - currDate.getMonth();

    // const day = date.getDay() - currDate.getDay();

    // const hours = date.getHours() - currDate.getHours();

    // const minutes = date.getMinutes() - currDate.getMinutes();

    // const seconds = date.getSeconds() - currDate.getSeconds();

    const test = new Date(+timeStamp).toDateString();

    // console.log(year, month, day, hours, minutes, seconds);
    // }, 1000);

    return <span>{test}</span>;
  };

  const renderCategory = (data) => {
    return (
      <>
        {data.categories &&
          data.categories.map((cat, index) => (
            <Fragment key={cat.id}>
              <span
                className={`table__changes_category ${
                  index > 2 && category !== data.id ? 'hidden' : ''
                }`}
                style={{ borderColor: cat.color, color: cat.color }}>
                {cat.title}
                <Tooltip title="What is it?" message={cat.tooltip} />
              </span>

              <div className="table__changes_category_dropdown_icon">
                {index === 2 && <ArrowIcon />}
              </div>
            </Fragment>
          ))}
      </>
    );
  };

  return (
    <div className={`m__table__container ${area}`}>
      <ul className="m__table">
        <li className="table__header">
          {headers.map((item, index) => (
            <div
              key={index}
              className="col head_items"
              style={{ flexBasis: `${spaces[index]}%` }}>
              {item} {info && <InfoIcon />}
              <p className="info__details">{headerItemsInof[index]}</p>
            </div>
          ))}
        </li>
        {data &&
          data.map((item, index) => (
            <li
              key={index}
              className={`table__row`}
              onClick={() => navigate(`/collection/${item?.collection_name}`)}
              // className={`table__row ${
              //   category === item.id ||
              //   item.user.nftName ||
              //   maxMint === item.id ||
              //   item.user.nftName
              //     ? 'open'
              //     : ''
              // }`}
            >
              <div className="col" style={{ flexBasis: `${spaces[0]}%` }}>
                <div className="table__details">
                  <img src="https://picsum.photos/500" alt="" />
                  <div>
                    <span
                      className="table__details_nftName"
                      // className={`table__details_nftName ${
                      //   item.user.nftName.length > 22 ? 'over' : ''
                      // }`}
                    >
                      <span>{item?.collection_name}</span>
                    </span>
                    {area === 'trending__table' && (
                      <span className="table__details_time">
                        {item?.user?.time}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {area === 'trending__table' ? (
                <>
                  {/*  */}
                  <div
                    className="col"
                    style={{ flexBasis: `${data.spaces[1]}%` }}>
                    <div className="table__changes">
                      {sort === 'High/Low' ? (
                        <>
                          <span>{item?.floor.change}</span>
                          <span
                            className={item?.floor.hl > 0 ? 'green' : 'red'}>
                            {+item?.floor.hl > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {item?.floor.hl.replace('-', '')}%
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className={item?.floor.hl > 0 ? 'green' : 'red'}>
                            {+item?.floor.hl > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {item?.floor.hl.replace('-', '')}%
                          </span>
                          <span>{item?.floor.change}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/*  */}
                  <div
                    className="col"
                    style={{ flexBasis: `${data.spaces[2]}%` }}>
                    <div className="table__changes">
                      {sort === 'High/Low' ? (
                        <>
                          <span>{item?.saies.change}</span>
                          <span
                            className={item?.saies.hl > 0 ? 'green' : 'red'}>
                            {+item?.saies.hl > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {item?.saies.hl.replace('-', '')}%
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className={item?.saies.hl > 0 ? 'green' : 'red'}>
                            {+item?.saies.hl > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {item?.saies.hl.replace('-', '')}%
                          </span>
                          <span>{item?.saies.change}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/*  */}
                  <div
                    className="col"
                    style={{ flexBasis: `${data.spaces[3]}%` }}>
                    <div className="table__changes">
                      {sort === 'High/Low' ? (
                        <>
                          <span>{item?.listings.change}</span>
                          <span
                            className={item?.listings.hl > 0 ? 'green' : 'red'}>
                            {+item?.listings.hl > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {item?.listings.hl.replace('-', '')}%
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className={item?.listings.hl > 0 ? 'green' : 'red'}>
                            {+item?.listings.hl > 0 ? (
                              <FlashUpIcon />
                            ) : (
                              <FlashDownIcon />
                            )}
                            {item?.listings.hl.replace('-', '')}%
                          </span>
                          <span>{item?.listings.change}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/*  */}
                  <div
                    className="col"
                    style={{ flexBasis: `${data.spaces[4]}%` }}>
                    <div className="table__changes single">
                      <span>{item?.volume}</span>
                    </div>
                  </div>

                  {/*  */}
                  <div
                    className="col"
                    style={{ flexBasis: `${data.spaces[5]}%` }}>
                    <div className="table__changes single">
                      <span>{item?.marketCap}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col" style={{ flexBasis: `${spaces[1]}%` }}>
                    <div className="table__changes single">
                      <span>{item?.quantity}</span>
                    </div>
                  </div>

                  {/* twitter_member */}
                  <div className="col" style={{ flexBasis: `${spaces[2]}%` }}>
                    <div className="table__changes single">
                      <span>{item?.twitter_member}</span>
                    </div>
                  </div>

                  {/* discord_member */}
                  <div className="col" style={{ flexBasis: `${spaces[3]}%` }}>
                    <div className="table__changes single">
                      <span>{item?.discord_member}</span>
                    </div>
                  </div>

                  {/* presale_price */}
                  <div className="col" style={{ flexBasis: `${spaces[4]}%` }}>
                    <div className="table__changes single">
                      <span>{item?.presale_price?.split(' ')[0]}</span>
                      <span className="ETH">
                        {item?.presale_price?.split(' ')[1]}
                      </span>
                    </div>
                  </div>

                  {/* publicsale_price */}
                  <div className="col" style={{ flexBasis: `${spaces[5]}%` }}>
                    <div className="table__changes single">
                      <span>{item?.publicsale_price?.split(' ')[0]}</span>
                      <span className="ETH">
                        {item?.publicsale_price?.split(' ')[1]}
                      </span>
                    </div>
                  </div>

                  {/* max_mint */}
                  <div
                    className="col"
                    // className={`col col__mint ${
                    //   maxMint === item.user.nftName ? 'open' : ''
                    // }`}
                    style={{ flexBasis: `${spaces[6]}%` }}>
                    <div
                      className="table__changes single"
                      // onClick={() => {
                      //   setMaxMint((prev) =>
                      //     prev === item.user.nftName ? '' : item.user.nftName
                      //   );
                      //   setCategory('');
                      // }}
                    >
                      <span>{item.max_mint}</span>
                      {/* {item.maxMint.map((mint, index) => (
                        <span key={index} className="table__changes_mint">
                          {mint}
                        </span>
                      ))} */}
                    </div>
                  </div>

                  {/* presale_mint_timestamp */}
                  <div className="col" style={{ flexBasis: `${spaces[7]}%` }}>
                    <div className="table__changes">
                      {/* <span>{item.presale_mint_timestamp}</span> */}
                      <span className="table__changes_date">
                        <GetTime timeStamp={item?.presale_mint_timestamp} />
                      </span>
                    </div>
                  </div>

                  {/* publicsale_mint_timestamp */}
                  <div className="col" style={{ flexBasis: `${spaces[8]}%` }}>
                    <div className="table__changes">
                      {/* <span>{item.publicsale_mint_timestamp}</span> */}
                      <span className="table__changes_date">
                        <GetTime timeStamp={item?.publicsale_mint_timestamp} />
                      </span>
                    </div>
                  </div>

                  {/* reveal */}
                  {reveal && (
                    <div className="col" style={{ flexBasis: `${spaces[9]}%` }}>
                      <div className="table__changes">
                        <span className="table__changes_date">
                          <GetTime timeStamp={item?.reveal_timestamp} />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* category */}
                  <div
                    className={`col col__category ${
                      category === item?.id && item?.categories.length > 2
                        ? 'open'
                        : ''
                    }`}
                    style={{
                      flexBasis: `${spaces[10]}%`
                    }}
                    onClick={() => {
                      setCategory((prev) =>
                        prev === item?.id ? null : item?.id
                      );
                    }}>
                    <div className="table__changes table__changes_category_container">
                      {renderCategory(item)}
                    </div>
                  </div>

                  {/* social */}
                  <div className="col" style={{ flexBasis: `${spaces[11]}%` }}>
                    <div className="table__changes table__changes_social">
                      <a href={item?.discord_link}>
                        <DiscordIcon />
                      </a>
                      <a href={item?.twitter_link}>
                        <TwitterIcon />
                      </a>
                      <a href={item?.website_link}>
                        <WorldIcon />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DropsTable;

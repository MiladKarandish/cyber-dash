import { useEffect, useState } from 'react';
import 'styles/drops.scss';
import 'styles/drops/dropsTable.scss';
import ButtonGroup from 'components/ButtonGroup';
import Navigator from 'components/Navigator';
import { ReactComponent as FilterIcon } from 'assets/icons/filtr.svg';
import Filter from 'components/drops/DropsFilter';
import Search from 'components/Search';
import DropsTable from 'components/drops/DropsTable';
import useFetcher from 'hooks/useFetcher';

const Drops = () => {
  // const [data, loading] = useFetcher(
  //   'https://api.cyberdash.app/v1/tables/upcoming'
  // );

  const data = {
    rows: [
      {
        id: 1,
        collection_name: 'Koala Nft',
        categories: [
          {
            id: 1,
            title: 'Koala Nft',
            tooltip: 'tooltip'
          },
          {
            id: 2,
            title: 'NFT',
            tooltip: 'tooltip'
          }
        ],
        reveal_timestamp: '1686048143',
        publicsale_mint_timestamp: '1686048143',
        max_mint: 12,
        publicsale_price: '21 vs',
        presale_price: '86 rh',
        discord_member: 5,
        twitter_member: 2,
        quantity: 0.2
      },
      {
        id: 2,
        collection_name: 'Full Nft',
        categories: [
          {
            id: 1,
            title: 'Full Nft',
            tooltip: 'tooltip'
          },
          {
            id: 2,
            title: 'NFT',
            tooltip: 'tooltip'
          }
        ],
        reveal_timestamp: '1023343943',
        publicsale_mint_timestamp: '1023343943',
        max_mint: 5,
        publicsale_price: '32 vs',
        presale_price: '10 rh',
        discord_member: 4,
        twitter_member: 3,
        quantity: 0.5
      }
    ]
  };

  const [openFilter, setOpenFiter] = useState(false);
  const [reveal, setReveal] = useState(false);

  const onClick = (e) => {
    setOpenFiter((prev) => !prev);
  };

  const activeButtonsChange = (value) => {
    setReveal(value === 'Reveal');
  };

  useEffect(() => {
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

  const closer = () => {
    setOpenFiter(false);
  };

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <div className="drops">
      {openFilter && <Filter callBack={closer} />}
      <div className="drops__title">
        <h2>Drops</h2>
        <p>We only include the projects that are worth mentioning</p>
      </div>

      <Navigator />

      <div className="drops__title drops__title2">
        <h2>Upcomming Calendar</h2>
        <p>In this table you can find upcoming NFT Projects</p>
      </div>

      <div className="drops__sort_timer">
        <div className="drops__sort-details">
          {/* <span>Sorted By: </span> */}
          <ButtonGroup
            items={['Upcoming', 'Reveal']}
            activeDefault="Upcoming"
            font="normal normal bold 12px/14px Roboto"
            height="30px"
            paddingTop="1rem"
            containerStyles={{
              border: '1px solid #1956E2',
              minWidth: '194px',
              height: '30px'
            }}
            callBack={activeButtonsChange}
          />
        </div>

        <div className="search__filter__container">
          <div className="">
            <Search
              className="other-placeholder"
              styles={{
                width: '194px',
                height: '30px',
                border: '1px solid #1956E2',
                background: '#0B1E39 0% 0% no-repeat padding-box',
                color: '#fff'
              }}
            />
          </div>

          <div className="drops__filter" id="filter" onClick={onClick}>
            <FilterIcon />
          </div>
        </div>
      </div>

      <div className="drops__table__container">
        <DropsTable
          data={data?.rows}
          sort={false}
          info={false}
          area="mTableDrops"
          reveal={reveal}
        />
      </div>
    </div>
  );
};

export default Drops;

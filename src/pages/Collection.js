import { TRENDING_DATA } from 'data';
import 'styles/collections/mainCollection.scss';
import InfoBox from 'components/collections/trending/InfoBox';
import CollectionTrendingDashboard from 'components/collections/trending/CollectionTrendingDashboard';
import RevealStatus from 'components/RevealStatus';
import Search from 'components/Search';
import { ReactComponent as WorldIcon } from 'assets/images/table-world.svg';
import { ReactComponent as TwitterIcon } from 'assets/images/table-twitter.svg';
import { ReactComponent as DiscordIcon } from 'assets/images/discordNoBackground.svg';
import { ReactComponent as OpenSeaIcon } from 'assets/images/openSeaNoBackground.svg';
import { ReactComponent as EtherScanIcon } from 'assets/images/etherscan-logo-circle.svg';
import { ReactComponent as LooksrareIcon } from 'assets/images/looksrare.svg';
import { ReactComponent as CopyIcon } from 'assets/images/copy.svg';
import { ReactComponent as ExternalLinkIcon } from 'assets/images/external-link.svg';
import { ReactComponent as BluetickIcon } from 'assets/images/bluebg-check.svg';
import { ReactComponent as TrendingIcon } from 'assets/images/Trending.svg';
import { ReactComponent as AnalyticalIcon } from 'assets/images/Analytical.svg';
import CollectionsList from 'components/collections/trending/CollectionsList';
import DropDown from 'components/DropDown';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { CollectionContextProvider } from 'contexts/collectionContext';
import FirstChart from 'components/collections/trending/lists/chart1/FirstChart';
import SecondChart from 'components/collections/trending/lists/chart2/SecondChart';
import ThirdChart from 'components/collections/trending/lists/chart3/ThirdChart';
import Analytical from 'components/collections/analytical/Analytical';
import CollectionModal from 'components/collections/trending/CollectionModal';

const Collection = () => {
  const params = useParams();
  const slug = params.slug;
  const [listingsSort, setListingsSort] = useState('null');
  const [view, setView] = useState('Trending');
  const [searchResult, setSearchResult] = useState('');

  const metaData = {
    banner_image_url: 'https://picsum.photos/2800/1080',
    image_url:
      'https://cdn.pixabay.com/photo/2022/01/17/17/20/bored-6945309_1280.png',
    collection_name: slug,
    contract_address: '121asd5g4ef',
    website_url: 'www.nftwebsite.nft',
    twitter_url: 'twitter.com/nft',
    floor_price: 132
  };

  // const [metaData] = useFetcher(
  //   `https://api.cyberdash.app/v1/collections/${slug}`
  // );

  const searchHandler = (val) => val && setSearchResult(val);

  return (
    <CollectionContextProvider>
      {metaData && (
        <div className="collection__container">
          {searchResult && (
            <CollectionModal
              data={searchResult}
              callBack={() => setSearchResult(null)}
            />
          )}
          <div className="collection__head_header">
            <img
              src={metaData?.banner_image_url}
              className="collection__head_header"
              alt=""
            />
            <img
              src={metaData?.image_url}
              className="hader__cricle_image"
              alt=""
            />
          </div>

          <div className="collection__head_content">
            <div className="collection__reveal_container">
              <span>REVEAL STATUS</span>
              <RevealStatus />
            </div>

            <div className="collection__center_box">
              <h1 className="collection__title">
                {metaData?.collection_name}{' '}
                <BluetickIcon className="blue_tick" />
              </h1>
              <span className="collection__id">
                {metaData?.contract_address} <CopyIcon />
                <ExternalLinkIcon className="external_link_svg" />
              </span>
              {metaData && <InfoBox data={metaData} />}
            </div>

            <div className="collection__search">
              <div>
                <a href={metaData?.website_url}>
                  <WorldIcon />
                </a>
                <a href={metaData?.twitter_url}>
                  <TwitterIcon />
                </a>
                <a
                  href={metaData?.discord_url}
                  style={{ transform: 'scale(1.5)' }}>
                  <DiscordIcon />
                </a>
                <a href={metaData?.opensea_url}>
                  <OpenSeaIcon />
                </a>
                <a href={metaData?.website_url}>
                  <LooksrareIcon />
                </a>
                <a href={metaData?.website_url}>
                  <EtherScanIcon />
                </a>
              </div>
              <Search callBack={searchHandler} />
            </div>
          </div>

          <div className="collection__views">
            <div
              className={`${view === 'Trending' && 'active'}`}
              onClick={() => setView('Trending')}>
              <TrendingIcon />
              <span>Trending Dashboard</span>
            </div>

            <div
              className={`${view === 'Analytical' && 'active'}`}
              onClick={() => setView('Analytical')}>
              <AnalyticalIcon />
              <span>Analytical Charts</span>
            </div>
          </div>

          {view === 'Trending' ? (
            <>
              <div style={{ marginBottom: '67px' }}>
                <CollectionTrendingDashboard />
              </div>
              <div className="collection__lists__cahrts_conatiner">
                <div className="collection__list_container">
                  <div className="collection__list__header">
                    <h2>Listings</h2>

                    <div className="collection__list__header_dropdown">
                      <DropDown
                        fontSize="3rem"
                        innerColor="#244677"
                        minWidth="111px"
                        items={[
                          { name: 'Date' },
                          { name: 'Price' },
                          { name: 'Rank' }
                        ]}
                        placeholder={'Sorting'}
                        callBack={(val) => setListingsSort(val)}
                      />
                    </div>
                  </div>
                  <CollectionsList
                    slug={slug}
                    type={'listings'}
                    sort={listingsSort}
                  />
                </div>

                <div className="collection__charts_container">
                  <FirstChart />

                  <SecondChart data={metaData} />
                </div>

                <div className="collection__list_container">
                  <div className="collection__list__header">
                    <h2>Sales</h2>
                  </div>
                  <CollectionsList slug={slug} type={'orders'} />
                </div>
              </div>
              <ThirdChart />
            </>
          ) : (
            <Analytical />
          )}
        </div>
      )}
    </CollectionContextProvider>
  );
};

export default Collection;

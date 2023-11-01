import 'styles/collections/collectionList.scss';
import useFetcher from 'hooks/useFetcher';
import CollectionModal from './CollectionModal';
import { ReactComponent as OpenSeaIcon } from 'assets/images/openSea-logo-circle-collections.svg';
import { ReactComponent as EtherScanIcon } from 'assets/images/etherscan-logo-circle-orders.svg';
import { ReactComponent as EthIcon } from 'assets/images/eth-icon.svg';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import CollectionContext from 'contexts/collectionContext';

const defData = [
  { id: 201 },
  { id: 202 },
  { id: 203 },
  { id: 204 },
  { id: 205 },
  { id: 206 },
  { id: 207 },
  { id: 208 },
  { id: 209 },
  { id: 210 },
  { id: 211 },
  { id: 212 },
  { id: 213 },
  { id: 214 },
  { id: 215 },
  { id: 216 },
  { id: 217 },
  { id: 218 },
  { id: 219 },
  { id: 220 }
];

const listingsLoading = false;
const listingsData = {
  rows: [
    {
      id: 1,
      price: 25,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 2,
      price: 35,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 3,
      price: 35,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 4,
      price: 35,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 5,
      price: 35,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 6,
      price: 35,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 7,
      price: 35,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 8,
      price: 35,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 9,
      price: 35,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 10,
      price: 45,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 11,
      price: 45,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 12,
      price: 45,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 13,
      price: 45,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 14,
      price: 45,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 15,
      price: 45,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 16,
      price: 45,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 17,
      price: 45,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 18,
      price: 45,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 19,
      price: 45,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    },
    {
      id: 20,
      price: 45,
      timestamp: '1686130374',
      image_url: 'https://picsum.photos/200',
      token_rank: '12152 vs',
      token_id: 1,
      opensea_url: 'https://hnljkshajl.com',
      collectionId: 22
    }
  ]
};
const CollectionsList = ({ slug, type, sort }) => {
  if (sort === 'Date') sort = 'timestamp';
  if (sort === 'Rank') sort = 'token_rank';
  if (sort === 'Price') sort = 'price';

  // const [listingsData, listingsLoading] = useFetcher(
  //   `https://api.cyberdash.app/v1/collections/${slug}/${type}`
  // )

  const { collectionData, setCollectionData } = useContext(CollectionContext);

  const [modal, setModal] = useState(null);
  const [render, setRender] = useState(false);
  const [currentViewData, setCurrentViewData] = useState(defData);
  const timeOut = useRef(null);
  const observer = useRef(null);
  const nothing = useRef(null);
  const lastElement = useCallback(
    (el) => {
      if (listingsLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrentViewData(
            listingsData.rows.slice(0, currentViewData.length + 20)
          );
        }
      });

      if (el) observer.current.observe(el);
    },
    [currentViewData?.length, listingsData?.rows, listingsLoading]
  );

  const showModal = (item) => {
    setModal(item);
  };

  const timestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.getMinutes();
  };

  useEffect(() => {
    if (listingsData) {
      if (sort === 'price' || sort === 'token_rank') {
        setCurrentViewData(
          listingsData.rows.sort((a, b) => +a[sort] - +b[sort])
        );
      } else if (sort === 'timestamp') {
        setCurrentViewData(
          listingsData.rows.sort(
            (a, b) => timestampToDate(+a[sort]) - timestampToDate(+b[sort])
          )
        );
      } else {
        setCurrentViewData(listingsData.rows);
      }
      setCollectionData((prev) => ({ ...prev, [type]: listingsData.rows }));
    }
  }, [listingsData, setCollectionData, sort, type]);

  useEffect(() => {
    timeOut.current = setTimeout(() => {
      setRender((prev) => !prev);
    }, 1000);

    return () => {
      clearTimeout(timeOut.current);
      timeOut.current = null;
    };
  }, [render]);

  if (!slug) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="collection__list_scroll_container">
      {modal && (
        <CollectionModal data={modal} callBack={() => setModal(null)} />
      )}

      <div className="collection__list">
        {currentViewData?.at(0)?.collectionId
          ? currentViewData?.map((item) => (
              <div
                key={item.id}
                //ask if you should change it ^
                className="collection__list_item"
                onClick={showModal.bind(null, item)}
                onMouseEnter={(e) => clearTimeout(timeOut.current)}
                onMouseLeave={(e) => setRender((prev) => !prev)}
                ref={item === currentViewData.at(-1) ? lastElement : nothing}>
                <img src={item.image_url} alt="" className="skeleton" />

                <div className="Rank_Id__container">
                  <span className="Rank">
                    Rank: <span>1234</span>
                  </span>
                  <span className="Id">
                    #
                    {item.token_id || (
                      <div className="skeleton skeleton-text"></div>
                    )}
                  </span>
                </div>

                <div className="cards-right-side__container">
                  <div
                    className={
                      type === 'listings'
                        ? 'listings-specific'
                        : 'orders-specific'
                    }>
                    <div className="top-side-container">
                      <span className="price__container">
                        <span className="price-title__container">Price: </span>
                        <span className="price-amount-svg__container">
                          <EthIcon />
                          {item.price}
                        </span>
                      </span>

                      <div className="svg-button__container">
                        <button>Buy</button>

                        <a href={item.opensea_url} className="opensea__svg">
                          <OpenSeaIcon />
                        </a>
                        <a href="https://google.com" className="ethscan__svg">
                          <EtherScanIcon />
                        </a>
                      </div>
                    </div>

                    <span className="Time">
                      <span className="time-title__container">Time: </span>
                      <span className="time-amount__container">
                        {timestampToDate(item.timestamp)} minutes ago
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          : currentViewData?.map((item) => (
              <div key={item.id}>
                <div
                  key={item.id}
                  className="collection__list_item"
                  ref={item === currentViewData.at(-1) ? lastElement : nothing}>
                  <img src={item.image_url} alt="" className="skeleton" />

                  <div className="Rank_Id__container" style={{ width: '100%' }}>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default CollectionsList;

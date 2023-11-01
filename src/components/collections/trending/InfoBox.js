import 'styles/collections/collectionBox.scss';
import { ReactComponent as EthIcon } from 'assets/images/eth-icon.svg';

// {data}
const InfoBox = () => {
  const data = {
    total_supply: 5,
    owners_count: 3,
    floor_price: 5,
    volume_traded: 10,
    nft_royalty: 45,
    percent_owner: 12,
    average_price: 74,
    sales_volume: 7
  };

  return (
    <div className="collectionBox">
      <div className="collection__rect">
        <span className="value">{data.total_supply}</span>
        <span className="title">Supply</span>
      </div>
      <div className="collection__rect">
        <span className="value">{data.owners_count}</span>
        <span className="title">Owner</span>
      </div>
      <div className="collection__rect">
        <div className="box__text_icon">
          <EthIcon />
          <span className="value">{data.floor_price}</span>
        </div>
        <span className="title">Floor Price</span>
      </div>
      <div className="collection__rect">
        <span className="value">{data.volume_traded}</span>
        <span className="title">Volume Traded</span>
      </div>
      <div className="collection__rect">
        <span className="value">{data.nft_royalty}</span>
        <span className="title">Royalty</span>
      </div>
      <div className="collection__rect">
        <span className="value">{data.percent_owner}</span>
        <span className="title">% Owner</span>
      </div>
      <div className="collection__rect">
        <div className="box__text_icon">
          <EthIcon />
          <span className="value">{data.average_price}</span>
        </div>
        <span className="title">Average Price</span>
      </div>
      <div className="collection__rect">
        <span className="value">{data.sales_volume}</span>
        <span className="title">Sales Volume</span>
      </div>
    </div>
  );
};

export default InfoBox;

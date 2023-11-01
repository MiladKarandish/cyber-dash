import '../../styles/home/homeCard.scss';
import { ReactComponent as LogoIcon } from '../../assets/images/card-logo.svg';

const HomeCard = () => {
  return (
    <div className="home__card">
      <div className="card__image">
        <div>
          <h2>A New Way To</h2>
          <h3>
            Invest In <span>NFTs</span>
          </h3>
        </div>

        <LogoIcon />
      </div>

      <div className="card__text">
        <h4>A New Way To Invest In NFTs</h4>
        <p>
          the Nansen NFT indexes present a reliable way of navigating the NFT
          markets. This update raises the bar for quality financial
          infrastructure that supports the growing depth of the NFT industry
        </p>
      </div>
    </div>
  );
};

export default HomeCard;

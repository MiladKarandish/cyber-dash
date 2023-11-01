import '../styles/expectedPnlCard.scss';
import { ReactComponent as DiscordIcon } from '../assets/images/discordNoBackground.svg';
import { ReactComponent as TwitterIcon } from '../assets/images/twitterNoBackground.svg';
import { ReactComponent as OpenSeaIcon } from '../assets/images/openSeaNoBackground.svg';
import { ReactComponent as GearIcon } from '../assets/images/gear.svg';
import ButtonGroup from './ButtonGroup';
import Proggress from './Proggress';
import { useEffect, useState } from 'react';

const ExpectedPnlCard = () => {
  const [open, setOpen] = useState(false);
  const gearOpenHandler = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const closer = (e) => {
      if (!e.target.closest('.gasfee_container')) {
        setOpen(false);
      }
    };

    window && window.addEventListener('mouseup', closer);

    return () => {
      window.removeEventListener('mouseup', closer);
    };
  }, []);

  return (
    <div className="expectedPnlCard">
      <div className="exp__header">
        <span className="exp__title">Bijan Shmas</span>

        <TwitterIcon />
        <DiscordIcon />
        <OpenSeaIcon />
      </div>

      <div className="exp__items">
        <div>
          <span className="exp__item_title">Status</span>
          <div className="exp__item_value exp__item_status_value">
            <span className="status_green_circle">🟢</span> Presale
          </div>
        </div>
        <div>
          <span className="exp__item_title">Mint Price</span>
          <span className="exp__item_value">0.03 ETH</span>
        </div>
        <div>
          <span className="exp__item_title">Floor</span>
          <span className="exp__item_value">500</span>
        </div>
        <div>
          <span className="exp__item_title">OS Royalty</span>
          <span className="exp__item_value">2.5%</span>
        </div>
        <div>
          <span className="exp__item_title">NFT Royalty</span>
          <span className="exp__item_value">asd</span>
        </div>
        <div>
          <span className="exp__item_title">Listing</span>
          <span className="exp__item_value">5%</span>
        </div>
        <div>
          <div className={`gasfee_container ${open ? 'open' : ''}`}>
            <span className="exp__item_title">Gas Fee</span>
            <GearIcon onClick={gearOpenHandler} />
            <div className="gasfee__gear_menu">
              <ButtonGroup
                items={['Auto', 'Multiplier', 'Custom']}
                activeDefault="Multiplier"
                font="normal normal bold 12px/14px Roboto"
                height="30px"
                paddingTop="1rem"
                containerStyles={{
                  border: '1px solid #1956E2',
                  minWidth: '194px',
                  height: '30px',
                }}
              />

              <Proggress min="" max="" />
            </div>
          </div>
          <span className="exp__item_value">Set</span>
        </div>
        <div>
          <span className="exp__item_title">Presale In</span>
          <span className="exp__item_value exp__item_value_presale">0S</span>
        </div>
      </div>

      <p className="exp__footer">December 3, 15:17</p>
    </div>
  );
};

export default ExpectedPnlCard;

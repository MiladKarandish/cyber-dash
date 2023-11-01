import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/header/header.scss';
import logo from 'assets/images/Group 989.png';
import { ReactComponent as DiscordIcon } from 'assets/images/discord.svg';
import { ReactComponent as TwitterIcon } from 'assets/images/twitter.svg';
import { ReactComponent as OpenSeaIcon } from 'assets/images/opensea.svg';
import { ReactComponent as GasIcon } from 'assets/images/gas.svg';
import HeaderMenu from './HeaderMenu';
import Search from 'Search';
import { toast } from 'react-toastify';

import { MetaMask, Node } from 'libs/wallets';

const Header = () => {
  const navigate = useNavigate();

  const [provider, setProvider] = useState({});
  const [wallet, setwallet] = useState('');
  const [gasValue, setgasValue] = useState(0);

  useEffect(() => {
    setwallet(sessionStorage.getItem('key'));
  }, []);

  useEffect(() => {
    setProvider(window.ethereum);
  }, []);

  const metaMask = new MetaMask(provider);
  const node = new Node();

  const handleConnectWallet = () => {
    const contract = await node.checkContract('0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d')
      /*)
    metaMask.onClickConnect().then((item) => {
      if (item.status === 400) {
        toast(
          item.content?.message ||
            'MetaMask Not Found ! \n Please Install MetaMask',
          {
            type: 'error',
          }
        );
      } else {
        toast('Wallet is Connected', { type: 'success' });
        setwallet(item.content.address);

        sessionStorage.setItem('key', item.content.address);
      }
    });
    */
  };


  useEffect(() => {
    setInterval(async () => {
      const response = await node.getGas();
      setgasValue(response);
    }, 10000);
    setInterval(async () => {
      const checkAddress = await metaMask.onLoadConnect(window.ethereum);
      if (!checkAddress) {
        sessionStorage.clear();
        // history.push('/');
        setwallet('');
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="max-width-header-limiter">
      <div className="header">
        <img className="header__logo" src={logo} alt="logo" />

        <Search />

        <div className="header__menu-item">
          <span onClick={() => navigate('/drops')}>Drops</span>
          <span onClick={() => navigate('/trending')}>Trending</span>
          <span>FAQ</span>
          <span>Trending Kit</span>
        </div>

        <div className="header__contact">
          <div className="header__contact__gas">
            <GasIcon />
            <span>{gasValue} gwei</span>
          </div>

          <div className="header__contact__contact-icons">
            <TwitterIcon />
            <DiscordIcon />
            <OpenSeaIcon />
          </div>

          <button
            className="header__connect-wallet"
            onClick={handleConnectWallet}
          >
            {wallet
              ? `${wallet.substring(0, 5)}...${wallet.substring(
                  wallet.length - 5
                )}`
              : 'Connect Wallet'}
          </button>
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;

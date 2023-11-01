import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/header/header2.scss';
import { ReactComponent as DiscordIcon } from 'assets/images/discord.svg';
import { ReactComponent as TwitterIcon } from 'assets/images/twitter.svg';
import { ReactComponent as OpenSea } from 'assets/images/opensea.svg';
import { ReactComponent as GasIcon } from 'assets/images/gas.svg';
import HeaderMenu from './HeaderMenu';
import Search from 'components/Search';
import { toast } from 'react-toastify';
import { AutoMintContext } from 'contexts/autoMintContext';

import { MetaMask, Node } from 'libs/wallets';

const Header = () => {
  const navigate = useNavigate();

  const { setGwei, wallet, setwallet } = useContext(AutoMintContext);
  const [provider, setProvider] = useState({});
  const [gasValue, setgasValue] = useState(0);

  useEffect(() => {
    setwallet(sessionStorage.getItem('key'));
  }, []);

  useEffect(() => {
    setProvider(window.ethereum);
  }, []);

  const metaMask = new MetaMask(provider);
  const node = new Node();

  const handleConnectWallet = async () => {
    const contract = await node.checkContract(
      '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
    );

    metaMask.onClickConnect().then((item) => {
      if (item.status === 400) {
        toast(
          item.content?.message ||
            'MetaMask Not Found ! \n Please Install MetaMask',
          {
            type: 'error'
          }
        );
      } else {
        toast('Wallet is Connected', { type: 'success' });
        setwallet(item.content.address);

        sessionStorage.setItem('key', item.content.address);
      }
    });
  };

  useEffect(() => {
    setInterval(async () => {
      const response = await node.getGas();
      setGwei(response);
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
        <h2 onClick={() => navigate('/')}>NFToolkit</h2>

        <Search />

        <div className="header__menu-item">
          <span onClick={() => navigate('/drops')}>Drops</span>
          <span onClick={() => navigate('/trending')}>Trending</span>
          <span>FAQ</span>
        </div>

        <div className="header__contact">
          <div className="header__contact__gas">
            <GasIcon />
            <span>{gasValue} gwei</span>
          </div>

          <div className="header__contact__contact-icons">
            <TwitterIcon />
            <DiscordIcon />
            <OpenSea />
          </div>

          <button
            className="header__connect-wallet"
            onClick={handleConnectWallet}>
            {wallet
              ? `${wallet.substring(0, 5)}...${wallet.substring(
                  wallet.length - 5
                )}`
              : 'Connect Wallet'}
          </button>
          <HeaderMenu second={true} />
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect } from 'react';
import 'styles/dashboard/menu.scss';
// Icnos
import { ReactComponent as DashboardIcon } from 'assets/icons/dashboard.svg';
import { ReactComponent as SnipeIcon } from 'assets/icons/snipe.svg';
import { ReactComponent as AutoMintIcon } from 'assets/icons/auto-mint.svg';
import { ReactComponent as BulkIcon } from 'assets/icons/bulk.svg';
// Menus
import AutoMint from 'components/dashboard/AutoMint';
import Snipe from 'components/dashboard/Snipe';
import Bulk from 'components/dashboard/Bulk';

const renderIcon = (title) => {
  switch (title) {
    case 'Dashboard':
      return <DashboardIcon />;
    case 'Snipe':
      return <SnipeIcon />;
    case 'Auto Mint':
      return <AutoMintIcon />;
    case 'Bulk Bidder':
      return <BulkIcon />;
    default:
      break;
  }
};

let resetHandler;
const renderMenu = (title) => {
  switch (title) {
    case 'Dashboard':
      return;
    case 'Snipe':
      return <Snipe />;
    case 'Auto Mint':
      return <AutoMint callBack={resetHandler} />;
    case 'Bulk Bidder':
      return <Bulk />;
    default:
      return;
  }
};

const Menu = ({ title, active, noMenu, width, height, callBack }) => {
  const [activeState, setActiveState] = useState(active);

  useEffect(() => {
    setActiveState(active);

    const closer = (e) => {
      if (!e.target.closest('.menu')) {
        resetHandler();
      }
    };

    window && window.addEventListener('mouseup', closer);

    return () => {
      window.removeEventListener('mouseup', closer);
    };
  }, [active]);

  resetHandler = () => {
    setActiveState(false);
    callBack && callBack('');
  };

  return (
    <div
      className={`menu ${active ? 'active' : ''}`}
      id={title}
      onClick={(e) => {
        e.target.classList.contains('menu') && callBack && callBack(title);
      }}
      style={{ width: width || '', height: height || '' }}
    >
      {renderIcon(title)}
      <span>{title}</span>
      {!noMenu && activeState && renderMenu(title)}
    </div>
  );
};

export default Menu;

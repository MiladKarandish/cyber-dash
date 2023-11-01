import { useContext } from 'react';
import 'styles/dashboard/dashboard.scss';
import Menu from 'components/dashboard/Menu';
import Board from 'components/dashboard/Board';
import { AutoMintContext } from 'contexts/autoMintContext';

const menuItems = ['Dashboard', 'Snipe', 'Auto Mint', 'Bulk Bidder'];

const Main = () => {
  const { active, setActive } = useContext(AutoMintContext);

  const onClick = (menuName) => {
    setActive((prev) => (menuName === prev ? '' : menuName));
  };

  return (
    <div className="main">
      <div className="main__menu">
        {menuItems.map((item) => (
          <Menu
            active={item === active}
            key={item}
            title={item}
            callBack={onClick}
          />
        ))}
      </div>
      <div className="main__board">
        <Board route={active} />
      </div>
    </div>
  );
};

export default Main;

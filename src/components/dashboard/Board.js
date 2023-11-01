import 'styles/dashboard/board.scss';
import List from 'components/List';
import Menu from 'components/dashboard/Menu';

const Board = ({ route }) => {
  return route === 'Dashboard' ? (
    <div className="board__container">
      <h3 className="board__title">
        SELECT ONE OF THE BOTS FROM THE LEFT AND INITIATE A TASK
      </h3>
      <div className="board__bots">
        <Menu
          active={true}
          title={'Snipe'}
          noMenu={true}
          width="100px"
          height="100px"
        />
        <Menu
          active={true}
          title={'Auto Mint'}
          noMenu={true}
          width="100px"
          height="100px"
        />
        <Menu
          active={true}
          title={'Bulk Bidder'}
          noMenu={true}
          width="100px"
          height="100px"
        />
      </div>
    </div>
  ) : (
    <List />
  );
};

export default Board;

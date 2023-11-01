import '../styles/timer.scss';
import { ReactComponent as Clock } from '../assets/icons/clock.svg';

const Timer = ({ items, activeTimeFrame, setActiveTimeFrame, callBack }) => {
  const onTimeChangeHandler = (item) => {
    setActiveTimeFrame && setActiveTimeFrame(item);
    callBack && callBack(item);
  };

  return (
    <div className='timer'>
      <Clock />

      {items &&
        items.map((item) => (
          <button
            key={item}
            className={activeTimeFrame === item ? 'active' : ''}
            onClick={onTimeChangeHandler.bind(null, item)}>
            {item}
          </button>
        ))}
    </div>
  );
};

export default Timer;

import '../styles/progress.scss';

const Proggress = ({ min = 0, max = 100, sign = '%', value, callBack }) => {
  return (
    <div className="progress__container">
      <input
        className="progress__range"
        type="range"
        min={min}
        max={max}
        value={value || 0}
        onChange={(e) => callBack(e.target.value)}
      />
      <div className="progress__lables">
        {min && min !== '' && (
          <span>
            {min}
            {sign}
          </span>
        )}
        {max && max !== '' && (
          <span>
            {max}
            {sign}
          </span>
        )}
      </div>
    </div>
  );
};

export default Proggress;

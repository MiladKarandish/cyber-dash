import '../styles/SwitchJs.scss';

const SwitchJs = ({ onClick, style }) => {
  return (
    <div className='switchjs__container'>
      <label className='switch'>
        <input type='checkbox' onClick={onClick || null} />
        <div className='slider' style={{ ...style }}></div>
      </label>
    </div>
  );
};

export default SwitchJs;

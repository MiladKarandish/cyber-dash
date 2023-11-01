import { useEffect, useRef } from 'react';
import '../styles/input.scss';

const Input = ({
  title,
  type,
  placeholder,
  callBack,
  fontSize,
  value,
  require,
  cleaner,
  uniqueType
}) => {
  const form = useRef(null);

  useEffect(() => {
    form.current.reset();
  }, [cleaner]);

  return (
    <form className="input__container" ref={form}>
      <div
        className={`input__title-contianer ${title.length > 22 ? 'over' : ''}`}>
        <span style={{ fontSize: fontSize || '' }} className="input__title">
          {title}
        </span>
      </div>
      <input
        onChange={(e) => callBack && callBack(e.target.value, title, e)}
        className="input__input"
        type={type || 'text'}
        placeholder={placeholder}
        defaultValue={value}
        required={require || false}
      />
    </form>
  );
};

export default Input;

import { useEffect, useRef, useState } from 'react';
import 'styles/collections/floorVarDropdown.scss';
import { ReactComponent as Arrow } from 'assets/images/chevron-down.svg';
import MultiRangeSlider from 'components/MultiRangeSlider';

const DropDownFloorVar = ({
  title,
  placeholder,
  callBack,
  fontSize,
  value,
  innerColor,
  minWidth,
}) => {
  // const [data, setData] = useState('');
  const [placeHolder, setPlaceHolder] = useState(value || placeholder);
  const [open, setOpen] = useState(false);
  const [activeDropdwon, setActiveDropdwon] = useState('%');
  const data = useRef(null);

  const onClick = (e) => {
    if (e.target.classList.contains('dropdown')) {
      setOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    // window &&
    //   window.addEventListener('pointerdown', (e) => {
    //     if (!e.target.getAttribute('dropdown')) {
    //       setOpen(false);
    //     }
    //   });

    callBack(placeHolder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callBack, open]);

  return (
    <div className='floor-var__dropdown' dropdown='true'>
      <span
        className='title'
        style={{ fontSize: fontSize || '', minWidth: minWidth || '' }}
        dropdown='true'>
        {title}
      </span>
      <ul className='dropdown' onClick={onClick} dropdown='true'>
        <div className='dropdown__placeholder__icon' dropdown='true'>
          <span className='dropdown__placeholder' dropdown='true'>
            {placeHolder}
          </span>
          <Arrow />
        </div>
        <div className='dropdown__scroll' dropdown='true'>
          <ul
            className={`dropdown__items ${open ? 'open' : ''}`}
            dropdown='true'
            style={{ backgroundColor: innerColor }}>
            <div dropdown='true' className='dropdown_items'>
              <li
                onClick={() => setActiveDropdwon('%')}
                className={`${activeDropdwon === '%' ? '' : 'deActive'}`}>
                <div className='sign'>%</div>
                <MultiRangeSlider
                  min={-1000}
                  max={1000}
                  type={'%'}
                  active={activeDropdwon === '%'}
                  onChange={({ min, max }) => {
                    activeDropdwon === '%' &&
                      setPlaceHolder(`${min}, ${max} %`);
                  }}
                />
              </li>

              <li
                onClick={() => setActiveDropdwon('X')}
                className={`${activeDropdwon === 'X' ? '' : 'deActive'}`}>
                <div className='sign'>X</div>
                <MultiRangeSlider
                  min={-100}
                  max={100}
                  type={'x'}
                  active={activeDropdwon === 'X'}
                  onChange={({ min, max }) => {
                    activeDropdwon === 'X' &&
                      setPlaceHolder(`X ${min}, ${max}`);
                  }}
                />
              </li>
            </div>
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default DropDownFloorVar;

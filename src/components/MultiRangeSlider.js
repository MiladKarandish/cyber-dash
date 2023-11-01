import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/multiRangeSlider.scss';

const MultiRangeSlider = ({ min, max, onChange, active }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [activeInput, setActiveInput] = useState(null);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const valueSetter = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Show input
  const onDoubleClick = (e) => {
    if (active) {
      const target = e.target.classList[1].split('--')[1];
      setActiveInput((prev) => (prev === target ? null : target));
    } else {
      setActiveInput(null);
    }
  };

  const valueSetterHandler = (e) => {
    if (
      activeInput === 'left' &&
      +e.target.value &&
      +e.target.value >= min &&
      +e.target.value <= max
    )
      setMinVal(+e.target.value);

    if (
      activeInput === 'right' &&
      +e.target.value &&
      +e.target.value >= min &&
      +e.target.value <= max
    )
      setMaxVal(+e.target.value);
  };

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }

    if (activeInput === 'left')
      valueSetter.current.style.left = minPercent - (minPercent / 20 + 9) + '%';
  }, [minVal, getPercent, activeInput]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
      if (activeInput === 'right')
        valueSetter.current.style.left =
          maxPercent - (maxPercent / 20 + 9) + '%';
    }
  }, [maxVal, getPercent, activeInput]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  useEffect(() => {
    const closer = (e) => {
      if (!e.target.closest('.value__setter')) {
        setActiveInput(null);
      }
    };

    window.addEventListener('click', closer);

    return () => {
      window.removeEventListener('click', closer);
    };
  }, []);

  return (
    <div className='multirange__container'>
      <input
        type='text'
        className={`value__setter ${!activeInput ? 'hidden' : ''}`}
        ref={valueSetter}
        onChange={valueSetterHandler}
        value={activeInput === 'left' ? minVal : maxVal || 0}
      />

      <input
        type='range'
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        onDoubleClick={onDoubleClick}
        className='thumb thumb--left'
        style={{ zIndex: minVal > max - 100 && '5' }}
      />
      <input
        type='range'
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        onDoubleClick={onDoubleClick}
        className='thumb thumb--right'
      />

      <div className='slider'>
        <div className='slider__track' />
        <div ref={range} className='slider__range' />
        <div className='slider__left-value'>{min}</div>
        <div className='slider__right-value'>{max}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;

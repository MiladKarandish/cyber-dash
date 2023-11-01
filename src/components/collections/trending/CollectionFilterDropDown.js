import 'styles/collections/collectionFilterDropDown.scss';
import { ReactComponent as ArrowIcon } from 'assets/images/downArrow.svg';
import { ReactComponent as CloseIcon } from 'assets/images/close.svg';
import { useEffect, useState } from 'react';

const tempListItems = [
  '74 (0.5%)',
  '74 (0.4%)',
  '74 (0.1%)',
  '74 (0.25%)',
  '74 (0.75%)'
];

const CollectionFilterDropDown = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const addToListHandler = (e) => {
    if (
      e.target.tagName === 'SPAN' &&
      !e.target.classList.contains('checked')
    ) {
      const newItems = [...items];
      newItems.push(e.target.textContent);
      setItems(newItems);
    }
  };

  const removeItemHandler = (item) => {
    const newItems = [...items].filter((i) => i !== item);

    setItems(newItems);
  };

  useEffect(() => {
    const closer = (e) => {
      if (!e.target.closest('.a__dropdown')) {
        setOpen(false);
      }
    };
    window && window.addEventListener('mouseup', closer);

    return () => {
      window.removeEventListener('mouseup', closer);
    };
  }, []);

  useEffect(() => {
    if (data.length <= 0) {
      setItems([]);
    }
  }, [data]);

  return (
    <div className="a__dropdown">
      <div className="a__dropdown__items">
        {items.map((item, index) => (
          <div key={index} className="a__dropdown__item">
            <span>{item}</span>
            <CloseIcon onClick={removeItemHandler.bind(null, item)} />
          </div>
        ))}
      </div>

      <div className="a__dropdown__icons">
        <div>
          <CloseIcon onClick={() => setItems([])} />
        </div>
        <div>
          <ArrowIcon onClick={() => setOpen((prev) => !prev)} />
        </div>
      </div>

      <div className={`a__dropdown_list ${open ? 'open' : ''}`}>
        {data?.length > 0 &&
          data[0].counts.map((item, index) => (
            <span
              key={index}
              className={`${items.includes(item.value) ? 'checked' : ''}`}
              onClick={addToListHandler}>
              {item.value}
            </span>
          ))}
      </div>
    </div>
  );
};

export default CollectionFilterDropDown;

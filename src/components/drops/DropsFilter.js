import { useState } from 'react';
import 'styles/filter.scss';
import { ReactComponent as ArrowDown } from 'assets/icons/arrow_down.svg';
import { ReactComponent as CancelIcon } from 'assets/images/cancel.svg';

// const compareItems = [
//   { name: '==' },
//   { name: '>=' },
//   { name: '<=' },
//   { name: '>' },
//   { name: '<' },
// ];

const DropsFilter = ({ title = 'Filter', callBack }) => {
  const [openItem, setOpenItem] = useState('Sales Count');

  const [category, setCategory] = useState([]);

  const openMenuHandler = (value) => {
    setOpenItem((prev) => (value === prev ? '' : value));
  };

  const closeCancel = () => {
    callBack();
  };

  const radioChangeHandler = (e) => {
    if (e.target.classList.contains('custom__radio__btn')) {
      document
        .querySelectorAll('.custom__radio__btn')
        .forEach((item) => item.classList.remove('selected'));

      const targetData = e.target.getAttribute('radio-data');
      let newCategory = [];

      newCategory.push(...category);
      if (newCategory.includes(targetData)) {
        newCategory = newCategory.filter((item) => item !== targetData);
      } else {
        newCategory.push(targetData);
      }

      setCategory(newCategory);
    }
  };

  return (
    <div className="filter">
      <div className="filter__header">
        <span>{title}</span>
        <span onClick={closeCancel} className="filter__header_closer">
          <CancelIcon />
        </span>
      </div>

      <div className="filter__menu">
        <div
          key={'Supply'}
          className={`filter__menu_item ${'Supply' === openItem ? 'open' : ''}`}
        >
          <div
            className="filter__menu_item_header"
            onClick={openMenuHandler.bind(null, 'Supply')}
          >
            <ArrowDown />
            <span>{'Supply'}</span>
          </div>

          <div className="filter__menu_item_content">
            <div className="filter__menu_item_content_minmax">
              <input type="text" placeholder="Min" />
              <span>to</span>
              <input type="text" placeholder="Max" />
            </div>
          </div>
        </div>

        <div
          key={'Presale Price'}
          className={`filter__menu_item ${
            'Presale Price' === openItem ? 'open' : ''
          }`}
        >
          <div
            className="filter__menu_item_header"
            onClick={openMenuHandler.bind(null, 'Presale Price')}
          >
            <ArrowDown />
            <span>{'Presale Price'}</span>
          </div>

          <div className="filter__menu_item_content">
            <div className="filter__menu_item_content_minmax">
              <input type="text" placeholder="Min" />
              <span>to</span>
              <input type="text" placeholder="Max" />
            </div>
            {/* <div className="filter__menu_item_content_average">
              <span>Average Sales for top</span>
              <input type="text" />
              <span> is:</span>
            </div> */}
          </div>
        </div>

        <div
          key={'Public Sale Price'}
          className={`filter__menu_item ${
            'Public Sale Price' === openItem ? 'open' : ''
          }`}
        >
          <div
            className="filter__menu_item_header"
            onClick={openMenuHandler.bind(null, 'Public Sale Price')}
          >
            <ArrowDown />
            <span>{'Public Sale Price'}</span>
          </div>

          <div className="filter__menu_item_content">
            <div className="filter__menu_item_content_minmax">
              <input type="text" placeholder="Min" />
              <span>to</span>
              <input type="text" placeholder="Max" />
            </div>
          </div>
        </div>

        <div
          key={'Categories'}
          className={`filter__menu_item ${
            'Categories' === openItem ? 'open' : ''
          }`}
        >
          <div
            className="filter__menu_item_header"
            onClick={openMenuHandler.bind(null, 'Categories')}
          >
            <ArrowDown />
            <span>{'Categories'}</span>
          </div>

          <div className="filter__menu_item_content">
            <div
              className="filter__menu_item_content_minmax filter__menu_item_radio"
              onClick={radioChangeHandler}
            >
              <li className="custom__radio__target">
                <p
                  className={`custom__radio__btn`}
                  data-selected={category.includes('cat1')}
                  radio-data="cat1"
                ></p>
                <span>Cat 1</span>
              </li>
              <li className="custom__radio__target">
                <p
                  className={`custom__radio__btn`}
                  radio-data="cat2"
                  data-selected={category.includes('cat2')}
                ></p>
                <span>Category 2</span>
              </li>
            </div>
          </div>
        </div>
      </div>

      <div className="filter__buttons">
        <button>RESET</button>
        <button>SUBMIT</button>
      </div>
    </div>
  );
};

export default DropsFilter;

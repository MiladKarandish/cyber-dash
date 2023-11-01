import { useState } from 'react';
import 'styles/filter.scss';
import { ReactComponent as ArrowDown } from 'assets/icons/arrow_down.svg';
import { ReactComponent as CancelIcon } from 'assets/images/cancel.svg';
import SwitchJs from './SwitchJs';
import DropDown from 'components/DropDown';

const compareItems = [
  { name: '==' },
  { name: '>=' },
  { name: '<=' },
  { name: '>' },
  { name: '<' },
];

const Filter = ({ title = 'Filter', callBack }) => {
  const [openItem, setOpenItem] = useState('Sales Count');

  const openMenuHandler = (value) => {
    setOpenItem((prev) => (value === prev ? '' : value));
  };

  const closeCancel = () => {
    callBack();
  };

  return (
    <div className='filter'>
      <div className='filter__header'>
        <span>{title}</span>
        <span onClick={closeCancel} className='filter__header_closer'>
          <CancelIcon />
        </span>
      </div>

      <div className='filter__menu'>
        <div
          key={'Sales Count'}
          className={`filter__menu_item ${
            'Sales Count' === openItem ? 'open' : ''
          }`}>
          <div
            className='filter__menu_item_header'
            onClick={openMenuHandler.bind(null, 'Sales Count')}>
            <ArrowDown />
            <span>{'Sales Count'}</span>
          </div>

          <div className='filter__menu_item_content'>
            <div className='filter__menu_item_content_minmax'>
              <input type='text' placeholder='Min' />
              <span>to</span>
              <input type='text' placeholder='Max' />
            </div>
          </div>
        </div>

        <div
          key={'Sales % Change'}
          className={`filter__menu_item ${
            'Sales % Change' === openItem ? 'open' : ''
          }`}>
          <div
            className='filter__menu_item_header'
            onClick={openMenuHandler.bind(null, 'Sales % Change')}>
            <ArrowDown />
            <span>{'Sales % Change'}</span>
          </div>

          <div className='filter__menu_item_content'>
            <div className='filter__menu_item_content_minmax'>
              <input type='text' placeholder='Min' />
              <span>to</span>
              <input type='text' placeholder='Max' />
            </div>
            <div className='filter__menu_item_content_average'>
              <span>Average Sales for top</span>
              <input type='text' />
              <span> is:</span>
            </div>
          </div>
        </div>

        <div
          key={'Listings Count'}
          className={`filter__menu_item ${
            'Listings Count' === openItem ? 'open' : ''
          }`}>
          <div
            className='filter__menu_item_header'
            onClick={openMenuHandler.bind(null, 'Listings Count')}>
            <ArrowDown />
            <span>{'Listings Count'}</span>
          </div>

          <div className='filter__menu_item_content'>
            <div className='filter__menu_item_content_minmax'>
              <input type='text' placeholder='Min' />
              <span>to</span>
              <input type='text' placeholder='Max' />
            </div>
          </div>
        </div>

        <div
          key={'Listings % Change'}
          className={`filter__menu_item ${
            'Listings % Change' === openItem ? 'open' : ''
          }`}>
          <div
            className='filter__menu_item_header'
            onClick={openMenuHandler.bind(null, 'Listings % Change')}>
            <ArrowDown />
            <span>{'Listings % Change'}</span>
          </div>

          <div className='filter__menu_item_content'>
            <div className='filter__menu_item_content_minmax'>
              <input type='text' placeholder='Min' />
              <span>to</span>
              <input type='text' placeholder='Max' />
            </div>
            <div className='filter__menu_item_content_average'>
              <span>Average Listings for top</span>
              <input type='text' />
              <span> is:</span>
            </div>
          </div>
        </div>

        <div
          key={'Volume'}
          className={`filter__menu_item ${
            'Volume' === openItem ? 'open' : ''
          }`}>
          <div
            className='filter__menu_item_header'
            onClick={openMenuHandler.bind(null, 'Volume')}>
            <ArrowDown />
            <span>{'Volume'}</span>
            <div className='filter__menu_switch'>
              <span>ETH</span>
              <SwitchJs />
            </div>
          </div>

          <div className='filter__menu_item_content'>
            <div className='filter__menu_item_content_minmax'>
              <input type='text' placeholder='Min' />
              <span>to</span>
              <input type='text' placeholder='Max' />
            </div>
          </div>
        </div>

        <div
          key={'Compare'}
          className={`filter__menu_item ${
            'Compare' === openItem ? 'open' : ''
          }`}>
          <div
            className='filter__menu_item_header'
            onClick={openMenuHandler.bind(null, 'Compare')}>
            <ArrowDown />
            <span>{'Compare'}</span>
          </div>

          <div className='filter__menu_item_content_compare'>
            <div className='filter__menu_item_content_minmax'>
              <span>Sales</span>
              <DropDown
                items={compareItems}
                fontSize='1.5rem'
                innerColor='#244677'
              />
              <span>Listings</span>
            </div>

            <div className='filter__menu_item_content_average'>
              <div className='filter__menu_switch' id='second'>
                <span>%</span>
                <SwitchJs />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='filter__buttons'>
        <button>RESET</button>
        <button>SUBMIT</button>
      </div>
    </div>
  );
};

export default Filter;

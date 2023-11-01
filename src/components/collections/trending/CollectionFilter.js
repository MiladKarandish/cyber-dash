import 'styles/collections/collectionFilter.scss';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow_down.svg';
import { useEffect, useState } from 'react';
import CollectionFilterDropDown from './CollectionFilterDropDown';

const menuItems = ['Price', 'Rank', 'Token', 'Trait'];

const CollectionFilter = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Trait');
  const [traitInput, setTraitInput] = useState('');
  const [trait, setTrait] = useState(null);
  const [traitDropdown, setTraitDropdown] = useState([]);

  const menuHandler = (e) => {
    if (
      e.target.tagName === 'BUTTON' &&
      !e.target.classList.contains('delete')
    ) {
      setActiveMenu(e.target.textContent);
    }
  };

  const onTraitInputChange = (e) => {
    setTraitInput(e.target.value);
  };

  // useEffect(() => {
  //   const fetcher = async () => {
  //     const res = await fetch(
  //       'https://api.cyberdash.app/v1/collections/0xe5e771bc685c5a89710131919c616c361ff001c6'
  //     )
  //     const data = await res.json()
  //     setTrait(data.string_traits)
  //   }
  //   if (!trait) {
  //     fetcher()
  //   } else {
  //     const filteredData = trait.filter((item) => {
  //       return item.key === traitInput
  //     })
  //     setTraitDropdown(filteredData)
  //   }
  // }, [trait, traitInput])

  return (
    <div className="collection__filter">
      <div className="collection__filter__content">
        <div className="collection__filter__menu" onClick={menuHandler}>
          {menuItems.map((item) => (
            <button
              key={item}
              className={`${item === activeMenu ? 'active' : ''}`}>
              {item}
            </button>
          ))}

          <div className="collection__filter_buttons">
            <button
              className="collection__filter__menu_resetall delete"
              onClick={() => setTraitDropdown([])}>
              Reset All
            </button>
            <button
              className="collection__filter__menu_reset delete"
              onClick={() => {
                setTraitDropdown([]);
                setTraitInput('');
              }}>
              Reset
            </button>
          </div>
        </div>

        <div className="collection__filter__content_content">
          {activeMenu !== 'Trait' ? (
            <>
              <span className="collection__filter__content_content_first_text">
                Show the {activeMenu.toLowerCase()} between
              </span>

              <div className="collection__filter_legend_input">
                <input type="text" />
                <label>Min</label>
              </div>

              <span>and</span>

              <div className="collection__filter_legend_input">
                <input type="text" />
                <label>Max</label>
              </div>
            </>
          ) : (
            <>
              <span>Select Trait</span>

              <div className="collection__filter_legend_input">
                <input
                  type="text"
                  value={traitInput}
                  onChange={onTraitInputChange}
                  placeholder=" "
                />
                <label>Min</label>
              </div>

              <span>Select Type</span>
              <CollectionFilterDropDown data={traitDropdown} />
            </>
          )}

          <button>Save</button>
        </div>
      </div>

      <div
        className={`collection__filter__sideMenu ${
          sideMenu ? 'open' : 'close'
        }`}
        onClick={() => setSideMenu((prev) => !prev)}>
        <div>
          <span className="">Ranking Method</span>
          <ArrowIcon />
          <button>Simple</button>
          <button className="active">Normalization</button>
          <button>Weighting</button>
        </div>
      </div>
    </div>
  );
};

export default CollectionFilter;

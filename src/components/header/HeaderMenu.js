import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/header/headerMenu.scss';

const header2Items = [{ name: 'Drops' }, { name: 'Trending' }, { name: 'FAQ' }];

// const header1Items = [
//   { name: 'Pricing' },
//   { name: 'Resources' },
//   { name: 'Cyberdash Alpha' },
//   { name: 'Institutions' },
//   { name: 'About us' },
// ];

const HeaderMenu = ({ second, items }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const routeChange = (key) => {
    navigate(key.toLowerCase());
  };

  useEffect(() => {
    const closer = (e) => {
      if (
        !e.target.closest('.hamb__items') &&
        !e.target.classList.contains('hamb__icon')
      ) {
        setOpen(false);
      } else {
        setOpen((prev) => !prev);
      }
    };

    window && window.addEventListener('mouseup', closer);

    return () => {
      window.removeEventListener('mouseup', closer);
    };
  }, []);

  return (
    <div className={`headermenu__container ${open ? 'open' : ''}`}>
      <div className="hamb__icon">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className="hamb__items">
        {header2Items.map((item) => (
          <li key={item.name} onClick={routeChange.bind(null, item.name)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderMenu;

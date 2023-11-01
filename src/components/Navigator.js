import { useNavigate } from 'react-router-dom';
import '../styles/navigator.scss';
import { useEffect, useState, useRef } from 'react';

const Navigator = ({
  items = [
    { name: 'Delta Nft', image: 'https://picsum.photos/5' },
    { name: 'Totem Nft', image: 'https://picsum.photos/5' },
    { name: 'Nft Trade', image: 'https://picsum.photos/5' },
    { name: 'Deluxe Nft', image: 'https://picsum.photos/5' },
    { name: 'Discreet Nft', image: 'https://picsum.photos/5' },
    { name: 'Nft Treats', image: 'https://picsum.photos/5' },
    { name: 'Rural Nft', image: 'https://picsum.photos/5' },
    { name: 'RedBox Nft', image: 'https://picsum.photos/5' },
    { name: 'Allegro Nft', image: 'https://picsum.photos/5' }
  ]
}) => {
  const navigate = useNavigate();
  const [rowCount, setRowCount] = useState(3);
  const [active, setActive] = useState(0);
  let navigator = useRef(null);
  let allSteps = useRef(items.slice(3, items.length));

  useEffect(() => {
    sizeHandler();

    window && window.addEventListener('resize', sizeHandler);

    return () => {
      window.removeEventListener('resize', sizeHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const navigateHandler = (e) => {
    const card = navigator.current.querySelectorAll('.navigator__card');

    if (e?.target?.id) {
      setActive(+e.target.id);

      const gap = Math.abs(
        card[0].getBoundingClientRect().left +
          card[0].getBoundingClientRect().width -
          card[1].getBoundingClientRect().left
      );

      const moveStep = card[0].getBoundingClientRect().width + gap;

      if (rowCount !== 1) {
        card.forEach((item) => {
          item.style.transform = `translate(${
            -moveStep * e.target.id
          }px, -50%)`;
        });
      } else {
        card.forEach((item) => {
          item.style.transform = `translate(${
            -parseInt(moveStep) * e.target.id
          }px, -50%)`;
        });
      }
    }
  };

  const sizeHandler = (e) => {
    const card = navigator.current.querySelectorAll('.navigator__card');
    const cardWidth = card[0].getBoundingClientRect().width;

    const row =
      Math.ceil(navigator.current.getBoundingClientRect().width / cardWidth) -
      1;

    switch (row) {
      case 4:
        allSteps.current = items.slice(3, items.length);
        break;
      case 3:
        allSteps.current = items.slice(2, items.length);
        break;
      case 2:
        allSteps.current = items.slice(1, items.length);
        break;
      case 1:
        allSteps.current = items.slice(0, items.length);
        break;

      default:
        break;
    }

    if (rowCount !== row) {
      setRowCount(row);
      card.forEach((item) => {
        item.style.transform = `translate(0, -50%)`;
      });
    }

    setSizes();
  };

  const setSizes = () => {
    const card = navigator.current.querySelectorAll('.navigator__card');

    const cardWidth = card[0].getBoundingClientRect().width;
    let gap =
      navigator.current.getBoundingClientRect().width - cardWidth * rowCount;

    gap = rowCount > 1 ? gap / (rowCount - 1) : 1;

    card.forEach((item, index) => {
      if (gap !== 1) {
        item.style.left = (cardWidth + gap) * index + 'px';
      } else {
        const gup = Math.abs(
          card[0].getBoundingClientRect().left +
            card[0].getBoundingClientRect().width -
            card[1].getBoundingClientRect().left
        );

        const navigatorWidth = navigator.current.getBoundingClientRect().width;

        item.style.left =
          (cardWidth + gup) * index + (navigatorWidth - cardWidth) / 2 + 'px';
      }
    });

    navigateHandler();
  };

  return (
    <div className="navigator">
      <h2>Today's Mint</h2>

      <div className="cards__navigator">
        <div className="navigator__cards" ref={navigator}>
          {items &&
            items.map((item, index) => (
              <div
                key={index}
                className={`navigator__card ${
                  active === index ? 'active' : ''
                }`}
                onClick={() => navigate(`/collection/${item.name}`)}>
                <img
                  className="navigator__card_image"
                  src={item.image + (8 + index).toString()}
                  alt=""
                />

                <div className="navigator__card_text">
                  <span className="navigator__card_text_name">{item.name}</span>
                  <span className="navigator__card_text_date">
                    December 3 , 12:45
                  </span>
                  <div className="navigator__card_text_time">
                    <span>0s</span>
                    <span>In Presale</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="navigator__buttons" onClick={navigateHandler}>
        {allSteps.current.map((_, index) => (
          <button
            key={index}
            id={index}
            className={index === active ? 'active' : ''}></button>
        ))}
      </div>
    </div>
  );
};

export default Navigator;

import '../styles/Alert.scss';

const Alert = ({
  title,
  message,
  type,
  open,
  cancelHandler,
  continueHandler,
}) => {
  return (
    <div className={`alert__container ${open ? 'open' : ''}`}>
      <div className="alert">
        <div className="alert__item">
          <h3 className="alert__title">{title}</h3>
          <div className="alert__close" onClick={cancelHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16px"
              height="16px"
              baseProfile="basic"
            >
              <rect
                width="4"
                height="15"
                x="6"
                y=".5"
                fill="#fff"
                transform="rotate(45.001 8 8)"
              />
              <rect
                width="4"
                height="15"
                x="6"
                y=".5"
                fill="#fff"
                transform="rotate(134.999 8 8)"
              />
            </svg>
          </div>
        </div>
        <p className="alert__message">{message}</p>
        <div className="alert__buttons alert__item">
          <button className="fill-btn" onClick={continueHandler}>
            Continue
          </button>
          <button className="border-btn" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;

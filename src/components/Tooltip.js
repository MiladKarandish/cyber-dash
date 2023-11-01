import '../styles/tooltip.scss';

const Tooltip = ({ title, message }) => {
  return (
    <div className="tooltip">
      <p className="tooltip__title">{title}</p>

      <p className="tooltip__message">{message}</p>
    </div>
  );
};

export default Tooltip;

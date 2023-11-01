import '../styles/button.scss';

const Button = ({
  text,
  bgColor = '#1956e2',
  color = '#fff',
  borderRadius,
  padding,
  fontSize = '1.4rem',
  font,
  fixWidth,
  callBack,
}) => {
  return (
    <div className={`button__container ${fixWidth ? 'fix' : ''}`}>
      <button
        className="button"
        style={{
          backgroundColor: bgColor || '',
          color: color || '',
          borderRadius: borderRadius || '',
          padding: padding,
          fontSize: fontSize,
          font: font,
        }}
        onClick={callBack}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;

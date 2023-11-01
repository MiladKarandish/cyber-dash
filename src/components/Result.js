import '../styles/result.scss';

const Result = ({ value = 0 }) => {
  return (
    <div className="result__container">
      <span>Estimated Total:</span>
      <h2>{value} ETH</h2>
    </div>
  );
};

export default Result;

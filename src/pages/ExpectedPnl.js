import '../styles/expectedPnl.scss';
import ExpectedPnlCard from '../components/expectedPnlCard';

const ExpectedPnl = () => {
  return (
    <div className="expectedPnl">
      <ExpectedPnlCard />

      <div className="exp__reports">
        <h2 className="exp__reports_title">Expected PnL</h2>

        <div className="exp__reports_card">
          <span>Please set "gas fee" to see the expected profit/loss</span>
          <span>
            This mint can load a x% loss/profit if you flip it right after
            minting
          </span>
          <span>PnL:</span>
        </div>
      </div>
    </div>
  );
};

export default ExpectedPnl;

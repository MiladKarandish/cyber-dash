import { Fragment } from 'react';
import '../styles/listItem.scss';
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import { ReactComponent as CopyIcon } from '../assets/icons/copy.svg';
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg';
import { ReactComponent as PauseIcon } from '../assets/icons/pause.svg';
import { ReactComponent as FlagIcon } from '../assets/icons/flag.svg';

const ListItem = ({ items = [], onDelete, onCopy, onEdit }) => {
  // const [flag, setFlag] = useState(false);

  const onFlagChange = (e) => {
    e.target.classList.toggle('active');
  };

  return (
    <table className="table">
      <thead>
        <tr className="table__head__row">
          <th>Contract Address</th>
          <th>Mint Price</th>
          <th>Gas Price/Fee</th>
          <th>Mode</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <Fragment key={item.id}>
            <tr className="table__body__row">
              <td>{item.contractAddress}</td>
              <td>{item.mintPrice}</td>
              <td>{item.fee}</td>
              <td>{item.mode}</td>
              <td>{item.status}</td>
              <td
                onClick={onFlagChange && onFlagChange}
                className="action-icon"
              >
                <FlagIcon />
              </td>
              <td className="action-icon">
                <PauseIcon />
              </td>
              <td
                className="action-icon"
                onClick={onEdit && onEdit.bind(null, item.id)}
              >
                <EditIcon />
              </td>
              <td
                className="action-icon"
                onClick={onCopy && onCopy.bind(null, item.id)}
              >
                <CopyIcon />
              </td>
              <td
                onClick={onDelete && onDelete.bind(null, item.id)}
                className="action-icon"
              >
                <DeleteIcon />
              </td>
            </tr>
            <tr className="table__space"></tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ListItem;

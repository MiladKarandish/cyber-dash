import { useContext } from 'react';
import 'styles/dashboard/autoMint.scss';
import DropDown from 'components/DropDown';
import Input from 'components/Input';
import Button from 'components/Button';
import Switch from 'components/Switch';
import { BulkContext } from 'contexts/bulkContext';

const dropdownData = [];

const Bulk = () => {
  const {
    contractAddress,
    token,
    price,
    expiryTime,
    type,
    setType,
    overbid,
    setOverbid,
    overbidIncrease,
    overbidMaxPrice,
    setOverbidMaxPrice,
    rpc,
    setRpc,
    rpcUrl,
  } = useContext(BulkContext);

  const contractAddressHandler = (value) => {
    contractAddress.current = value;
  };

  const tokenHandler = (value) => {
    token.current = value;
  };

  const priceHandler = (value) => {
    price.current = value;
  };

  const expiryTimeHandler = (value) => {
    expiryTime.current = value;
  };

  const typeHandler = (key) => {
    setType(key);
  };

  const overbidHandler = (bool) => {
    setOverbid(!bool);
  };

  const overbidIncreaseHandler = (value) => {
    overbidIncrease.current = value;
  };

  const overbidMaxPriceHandler = (key) => {
    setOverbidMaxPrice(key);
  };

  const rpcHandler = (key) => {
    setRpc(key);
  };

  const rpcUrlHandler = (value) => {
    rpcUrl.current = value;
  };

  const createTask = () => {};

  return (
    <div className="container">
      <div className="container__scroll">
        <Input
          title="Contract Address"
          placeholder="dsfhjmhisj45454"
          callBack={contractAddressHandler}
        />

        <Input title="Token" placeholder="1" callBack={tokenHandler} />

        <div className="container__multi-input">
          <Input title="Price *" placeholder="200" callBack={priceHandler} />
          <Input
            title="Expiry Time *"
            placeholder="1"
            callBack={expiryTimeHandler}
          />
          <DropDown
            title="Type *"
            placeholder={'Minutes'}
            items={dropdownData}
            value={type}
            callBack={typeHandler}
          />
        </div>

        <div className="container__multi-input">
          <Switch
            title="Overbid?"
            mode="col"
            fontSize="1.3rem"
            value={overbid}
            callBack={overbidHandler}
          />
          <Input
            title="Overbid Increase"
            type="number"
            placeholder="5"
            fontSize="1.3rem"
            callBack={overbidIncreaseHandler}
          />
          <DropDown
            title="Overbid Max Price"
            placeholder={'Minutes'}
            items={dropdownData}
            fontSize="1.3rem"
            value={overbidMaxPrice}
            callBack={overbidMaxPriceHandler}
          />
        </div>

        <DropDown
          title="RPC"
          placeholder={'Akhemy'}
          value={rpc}
          items={dropdownData}
          callBack={rpcHandler}
        />

        <Input
          title="RPC URL *"
          placeholder="https://google.com"
          callBack={rpcUrlHandler}
        />

        <Button text="Create Task" callBack={createTask} />
      </div>
    </div>
  );
};

export default Bulk;

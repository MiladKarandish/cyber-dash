import { useContext } from 'react';
import 'styles/dashboard/autoMint.scss';
import DropDown from 'components/DropDown';
import Input from 'components/Input';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Result from 'components/Result';
import { SnipeContext } from 'contexts/snipeContext';

const dropdownData = [
  { title: 'Your Wallet', data: 'Your Wallet' },
  { title: 'Private', data: 'priveate' },
];

const Snipe = () => {
  const {
    wallet,
    setWallet,
    marketPlace,
    setMarketPlace,
    maxBuy,
    collectionSlug,
    snipeBelow,
    snipeTrait,
    setSnipeTrait,
    traitValue,
    setTraitValue,
    snipeBelowRank,
    ignoreTokens,
    rpc,
    setRpc,
    rpcUrl,
    activeBtn,
    setActiveBtn,
    maxFeePerGas,
    setMaxFeePerGas,
    maxPeiorityFee,
    setMaxPeiorityFee,
    gasLimit,
    setGasLimit,
  } = useContext(SnipeContext);

  const selectWalletHandler = (key) => {
    setWallet(key);
  };

  const marketPlaceHandler = (key) => {
    setMarketPlace(key);
  };

  const maxBuyHandler = (value) => {
    maxBuy.current = +value;
  };

  const collectionSlugHandler = (value) => {
    collectionSlug.current = value;
  };

  const snipeBelowHandler = (value) => {
    snipeBelow.current = +value;
  };

  const snipeTraitHandler = (key) => {
    setSnipeTrait(key);
  };

  const traitValueHandler = (key) => {
    setTraitValue(key);
  };

  const snipeBelowRankHandler = (value) => {
    snipeBelowRank.current = +value;
  };

  const ignoreTokensHandler = (value) => {
    ignoreTokens.current = value;
  };

  const rpcHandler = (key) => {
    setRpc(key);
  };

  const activeButtonHandler = (active) => {
    setActiveBtn(active);
  };

  const rpcUrlHandler = (value) => {
    rpcUrl.current = value;
  };

  const maxFeePerGasHandler = (key) => {
    setMaxFeePerGas(key);
  };

  const maxPeiorityFeeHandler = (key) => {
    setMaxPeiorityFee(key);
  };

  const gasLimitHandler = (key) => {
    setGasLimit(key);
  };

  const loadTraitsHandler = () => {};

  const onCreateTask = () => {};

  return (
    <div className="container">
      <div className="container__scroll">
        <DropDown
          title="Select Wallet"
          placeholder={'Your Wallet'}
          items={dropdownData}
          callBack={selectWalletHandler}
          value={wallet}
        />

        <div className="container__multi-input">
          <DropDown
            title="Marketplace"
            placeholder={'OpenSea'}
            items={[
              { title: 'market1', data: 'mer1' },
              { title: 'market2', data: 'm2' },
            ]}
            callBack={marketPlaceHandler}
            value={marketPlace}
          />
          <Input
            title="Max Buy"
            type="number"
            placeholder="1"
            callBack={maxBuyHandler}
          />
        </div>

        <div className="container__multi-input">
          <Input
            title="Collection Slug *"
            placeholder="boardssdfsgclub"
            callBack={collectionSlugHandler}
          />
          <Button text="Load Traits" callBack={loadTraitsHandler} />
        </div>

        <Input
          title="Snipe Below *"
          placeholder="10"
          type="number"
          callBack={snipeBelowHandler}
        />
        <div className="container__multi-input">
          <DropDown
            title="Snipe Trait"
            placeholder={'(1) Selected)'}
            items={dropdownData}
            value={snipeTrait}
            callBack={snipeTraitHandler}
          />
          <DropDown
            title="Trait Value"
            placeholder={'(1) Selected)'}
            items={dropdownData}
            value={traitValue}
            callBack={traitValueHandler}
          />
        </div>

        <Input
          title="Snipe Below Rank"
          placeholder="10"
          callBack={snipeBelowRankHandler}
        />

        <Input
          title="Ignore Tokens"
          placeholder="451254 or 544.414"
          callBack={ignoreTokensHandler}
        />

        <DropDown
          title="RPC"
          placeholder={'Akhemy'}
          items={dropdownData}
          value={rpc}
          callBack={rpcHandler}
        />

        <Input
          title="RPC URL *"
          placeholder="https://google.com"
          callBack={rpcUrlHandler}
        />

        <ButtonGroup
          items={['Auto', 'Multiplier', 'Custom']}
          activeDefault={activeBtn}
          callBack={activeButtonHandler}
        />

        {/*  */}
        <div className="container__multi-input">
          <DropDown
            title="Max Fee Per Gas"
            placeholder={'8'}
            items={dropdownData}
            fontSize="1rem"
            value={maxFeePerGas}
            callBack={maxFeePerGasHandler}
          />
          <DropDown
            title="Max Peiority Fee"
            placeholder={'8'}
            items={dropdownData}
            fontSize="1rem"
            value={maxPeiorityFee}
            callBack={maxPeiorityFeeHandler}
          />
          <DropDown
            title="Gas Limit"
            placeholder={'8'}
            items={dropdownData}
            fontSize="1rem"
            value={gasLimit}
            callBack={gasLimitHandler}
          />
        </div>

        <Result />

        <Button text="Create Task" callBack={onCreateTask} />
      </div>
    </div>
  );
};

export default Snipe;

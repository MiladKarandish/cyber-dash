import { createContext, useState, useRef } from 'react';

export const SnipeContext = createContext();

const SnipeContextProvider = ({ children }) => {
  const edit = useRef(null);

  // Dropdwons
  const [wallet, setWallet] = useState('');
  const [marketPlace, setMarketPlace] = useState('');
  const [snipeTrait, setSnipeTrait] = useState('');
  const [traitValue, setTraitValue] = useState('');
  const [rpc, setRpc] = useState('');
  const [activeBtn, setActiveBtn] = useState('Auto');
  const [maxFeePerGas, setMaxFeePerGas] = useState(7);
  const [maxPeiorityFee, setMaxPeiorityFee] = useState(7);
  const [gasLimit, setGasLimit] = useState(7);

  // Inputs
  const maxBuy = useRef(0);
  const collectionSlug = useRef('');
  const snipeBelow = useRef(0);
  const snipeBelowRank = useRef(0);
  const ignoreTokens = useRef('');
  const rpcUrl = useRef('');

  // All tasks
  const [tasks, setTasks] = useState([]);

  // Menu
  const [active, setActive] = useState('Dashboard');

  const value = {
    edit,
    wallet,
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
    maxFeePerGas,
    setMaxFeePerGas,
    maxPeiorityFee,
    setMaxPeiorityFee,
    gasLimit,
    setGasLimit,

    setWallet,
    activeBtn,
    setActiveBtn,
    tasks,
    setTasks,
    active,
    setActive,
  };

  return (
    <SnipeContext.Provider value={value}>{children}</SnipeContext.Provider>
  );
};

export default SnipeContextProvider;

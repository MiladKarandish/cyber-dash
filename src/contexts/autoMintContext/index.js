import { createContext, useState, useRef } from 'react';

export const AutoMintContext = createContext();

const MintContextProvider = ({ children }) => {
  const contractAddress = useRef('');
  const [mintInputsRendered, setMintInputsRendered] = useState([]);
  const edit = useRef(null);
  const [mintPrice, setMintPrice] = useState(0);
  const [flagAbi, setFlagAbi] = useState([]);
  const [mintAbi, setMintAbi] = useState([]);
  const [mintInputs, setMintInputs] = useState([]);
  const [flagOutputs, setFlagOutputs] = useState([]);
  const [activeBtn, setActiveBtn] = useState('Auto');
  const [selectWallet, setSelectWallet] = useState('');
  const [gwei, setGwei] = useState(0);
  const [maxFeePerGas, setMaxFeePerGas] = useState(0);
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [gasLimit, setGasLimit] = useState(0);
  const [multiplierProgress, setMultiplierProgress] = useState(0);
  const [mode, setMode] = useState('');
  const [wallet, setwallet] = useState('');

  // All tasks
  const [tasks, setTasks] = useState([]);

  // Menu
  const [active, setActive] = useState('Dashboard');

  const value = {
    contractAddress,
    mintInputsRendered,
    setMintInputsRendered,
    edit,
    setMintPrice,
    mintPrice,
    flagAbi,
    setFlagAbi,
    mintAbi,
    setMintAbi,
    mintInputs,
    setMintInputs,
    flagOutputs,
    setFlagOutputs,
    activeBtn,
    setActiveBtn,
    selectWallet,
    setSelectWallet,
    gwei,
    setGwei,
    mode,
    setMode,
    tasks,
    setTasks,
    active,
    setActive,
    maxFeePerGas,
    setMaxFeePerGas,
    maxPriorityFeePerGas,
    setMaxPriorityFeePerGas,
    gasLimit,
    setGasLimit,
    estimatedTotal,
    setEstimatedTotal,
    multiplierProgress,
    setMultiplierProgress,
    wallet,
    setwallet
  };

  return (
    <AutoMintContext.Provider value={value}>
      {children}
    </AutoMintContext.Provider>
  );
};

export default MintContextProvider;

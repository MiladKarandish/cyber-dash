import { createContext, useState, useRef } from 'react';

export const BulkContext = createContext();

const BulkContextProvider = ({ children }) => {
  const edit = useRef(null);

  // Dropdwons
  const [type, setType] = useState('');
  const [overbid, setOverbid] = useState(false);
  const [overbidMaxPrice, setOverbidMaxPrice] = useState(false);
  const [rpc, setRpc] = useState('');

  // Inputs
  const contractAddress = useRef('');
  const token = useRef('');
  const price = useRef('');
  const expiryTime = useRef('');
  const overbidIncrease = useRef(0);
  const rpcUrl = useRef('');

  // All tasks
  const [tasks, setTasks] = useState([]);

  // Menu
  const [active, setActive] = useState('Dashboard');

  const value = {
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

    edit,
    tasks,
    setTasks,
    active,
    setActive,
  };

  return <BulkContext.Provider value={value}>{children}</BulkContext.Provider>;
};

export default BulkContextProvider;

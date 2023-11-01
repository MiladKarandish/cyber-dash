import Web3 from 'web3';
import { ethers } from 'ethers';
import { MetaMask, Node, Burner } from '../wallets';
const AbiCoder = require('web3-eth-abi');

const checkScamToken = async (contractAddress) => {
  try {
    const res = await fetch(
      `https://api.cyberdash.app/v1/bots/auto-mint/scam/contract/${contractAddress}`
    );
  } catch (e) {}
};

class AutoMint {
  constructor(ethereum, wallet) {
    this.wallet = wallet;
    this.ethereum = ethereum;
    this.web3Endpoint =
      'https://eth.getblock.io/mainnet/?api_key=91953f06-fc0a-4a48-87fc-145e8cf6d385';
  }

  generateTxData = async (
    address,
    value,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasMultiplier,
    gasInHeader,
    contractAddress,
    mintAbi,
    mintArgs
  ) => {
    try {
      if (maxFeePerGas <= maxPriorityFeePerGas)
        throw new Error('Max Fee Per Gas must be more than Max Priority Fee');

      const web3 = new Web3(this.web3Endpoint);

      const maxFee = web3.utils.toHex(
        web3.utils.toWei(Number(maxFeePerGas).toString(), 'gwei')
      );

      const maxPriorityFee = web3.utils.toHex(
        web3.utils.toWei(Number(maxPriorityFeePerGas).toString(), 'gwei')
      );

      value = web3.utils.toHex(
        web3.utils.toWei(Number(value).toString(), 'ether')
      );

      if (mintAbi === null)
        throw new Error('Please Select Your Mint ABI Function.');

      const data = AbiCoder.encodeFunctionCall(mintAbi, mintArgs);

      const nonce = await web3.eth.getTransactionCount(address, 'pending');

      const txData = {
        nonce: nonce,
        chainId: 1,
        type: 2,
        value: value,
        data: data,
        gasLimit: parseInt(gasLimit),
        maxFeePerGas: maxFee,
        maxPriorityFeePerGas: maxPriorityFee,
        to: contractAddress
      };

      return { sucess: true, txData: txData };
    } catch (e) {
      return { sucess: false, message: e.message };
    }
  };

  preSign = async (address, txData) => {
    try {
      if (String(this.wallet).toLowerCase() !== 'metamask')
        throw new Error('Only work with metamask');

      const metaMask = new MetaMask(this.ethereum);
      const preSignTx = await metaMask.preSignTx(address, txData);
      if (!preSignTx.success) throw new Error(preSignTx?.message);
      return preSignTx;
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  sendData = async (txData, isFlashBot = false, privateKey = null) => {
    try {
      if (
        String(this.wallet).toLowerCase() === 'metamask' &&
        privateKey === null
      ) {
        const metaMask = new MetaMask(this.ethereum);
        const sendTx = await metaMask.sendTx(txData);
        return sendTx;
      }
      const resTx = await Burner.sendTx(txData, privateKey, isFlashBot);
      return resTx;
    } catch (e) {
      return { sucess: false, message: e.message };
    }
  };

  sendPreSignData = async (rawTx, isFlashBot = false) => {
    try {
      const node = new Node(
        'https://eth.getblock.io/mainnet/?api_key=91953f06-fc0a-4a48-87fc-145e8cf6d385'
      );
      const resTx = await node.sendRawTx(rawTx, isFlashBot);

      return resTx;
    } catch (e) {
      return { sucess: false, message: e.message };
    }
  };

  checkFlag = async (
    contractAddress,
    flagAbi,
    flagArgs,
    mintAbi,
    mintArgs,
    fromAddress,
    value,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasMultiplier = 1,
    gasInHeader
  ) => {
    try {
      if (String(flagAbi?.name).includes('main')) {
        const data = AbiCoder.encodeFunctionCall(mintAbi, mintArgs);
        const node = new Node(this.web3Endpoint);
        const resEstimateGas = await node.estimateGas(
          fromAddress,
          contractAddress,
          data,
          value,
          maxFeePerGas,
          maxPriorityFeePerGas
        );
        return resEstimateGas;
      }

      const web3 = new Web3(this.web3Endpoint);

      const contract = new web3.eth.Contract([flagAbi], contractAddress);

      const result = await contract.methods[flagAbi.name]().call();

      if (flagArgs !== null && flagArgs.length > 0) {
        if (String(result) === String(flagArgs[0]))
          return { success: true, result: true };
        return { success: true, result: false };
      }

      return { success: true, result: result };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };
}

export default AutoMint;

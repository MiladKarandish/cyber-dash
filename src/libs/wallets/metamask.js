import { ethers } from 'ethers';
import Node from './node';

const r = async() => {
  
}

class MetaMask {
  constructor(ethereum) {
    this.ethereum = ethereum;
  }

  #isMetaMaskInstalled = () => {
    return Boolean(this.ethereum && this.ethereum.isMetaMask);
  };
  #isMetaMaskInstalledLocally = (ethereum) => {
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  onLoadConnect = async (ethereum) => {
    try {
      if (this.#isMetaMaskInstalledLocally(ethereum)) {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const ethereumAddress = accounts[0];
        if (String(ethereumAddress).includes('0x')) return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  onClickConnect = async () => {
    try {
      if (this.#isMetaMaskInstalled()) {
        await this.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await this.ethereum.request({
          method: 'eth_accounts'
        });
        const ethereumAddress = accounts[0];
        return { status: 200, content: { address: ethereumAddress } };
      }
      return {
        status: 400,
        content: { message: 'MetaMask Not Found ! \n Please Install MetaMask' }
      };
    } catch (e) {
      return {
        status: 400,
        content: { message: e.message }
      };
    }
  };

  preSignTx = async (address, txData) => {
    try {
      const utils = ethers.utils;

      const signingDataHashed = utils.keccak256(
        utils.serializeTransaction(txData)
      );

      const signature = await this.ethereum.request({
        method: 'eth_sign',
        params: [address, signingDataHashed]
      });

      const signedTransaction = utils.serializeTransaction(txData, signature);

      return {
        success: true,
        raw: signedTransaction
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  };

  sendPreSignTx = async (rawTx, isFlashbot = false) => {
    try {
      const node = new Node();
      const resTx = await node.sendRawTx(rawTx, isFlashbot);
      return resTx;
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  };

  sendTx = async (txData) => {
    try {
      const resTx = await this.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txData]
      });

      return {
        success: true,
        txId: resTx
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  };
}

export default MetaMask;

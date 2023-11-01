import axios from 'axios';
import Web3 from 'web3';

const toFixed = (x) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + new Array(e).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
};

class Node {
  constructor(web3Endpoint) {
    this.web3Endpoint = web3Endpoint;
  }

  getGas = async () => {
    try {
      const resGas = await axios.get(
        'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=J8JE42SMEHGS3BKD3SEQZQZ3BQR71ZY5BT'
      );
      if (resGas.status === 200 && resGas.data?.status == '1') {
        return resGas.data?.result?.FastGasPrice;
      }
      return 60;
    } catch {
      return 60;
    }
  };

  checkContract = async (contractAddress, hasProxy = false) => {
    try {
      if (String(contractAddress).includes('/')) {
        const pieces = contractAddress.split(/[\s/]+/);
        contractAddress = pieces[pieces.length - 1];
      }

      if (hasProxy) {
        const web3 = new Web3(this.web3Endpoint);
        const implementationStorage = await web3.eth.getStorageAt(
          contractAddress,
          '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'
        );
        contractAddress = '0x' + implementationStorage.slice(26);
      }

      const rawAbiUrl = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&format=raw&apikey=J8JE42SMEHGS3BKD3SEQZQZ3BQR71ZY5BT`;
      const responseRawAbi = await axios.get(rawAbiUrl);
      if (
        responseRawAbi.status === 200 &&
        responseRawAbi.data?.status !== '0'
      ) {
        const responseABI = responseRawAbi.data;
        const mintedAbi = this.#getMintABI(responseABI);
        const flagsAbi = this.#getFlagABI(responseABI);

        // alert(`mint ABI => \n  ${mintedAbi} \n Flags Abi => \n ${flagsAbi}  `)
        return {
          mintAbi: mintedAbi,
          flagAbi: flagsAbi
        };
      }
      // alert('can not find your Contract')
      return { error: 'The contract isn’t correct, check the address again' };
    } catch (e) {
      return { error: 'The contract isn’t correct, check the address again' };
    }
  };

  #getFlagABI = (abi) => {
    try {
      const CONTINUE_FILTER = [
        'private',
        'access',
        'give',
        'reve',
        'white',
        'renounce',
        'list',
        'presale',
        'pause'
      ];

      let DEFAULT_FLAG_FUNCTION = '';
      const PERHAPS_FLAG_FUNCTION = [];

      for (let i = 0; i < abi.length; i++) {
        try {
          if (
            abi[i].inputs.length === 0 &&
            abi[i].outputs[0].name === '' &&
            abi[i].stateMutability === 'view'
          ) {
            if (String(abi[i].name).toLowerCase().includes(CONTINUE_FILTER)) {
              continue;
            } else DEFAULT_FLAG_FUNCTION = abi[i];
            PERHAPS_FLAG_FUNCTION.push(abi[i]);
          }
        } catch (e) {
          continue;
        }
      }
      return {
        defaultFlagFunction: DEFAULT_FLAG_FUNCTION,
        allFlagFunctions: PERHAPS_FLAG_FUNCTION
      };
    } catch (e) {
      return {
        defaultFlagFunction: abi,
        allFlagFunctions: abi
      };
    }
  };

  #getMintABI = (abi) => {
    try {
      const CONTINUE_FILTER = [
        'presale',
        'renounce',
        'early',
        'allowlist',
        'white'
      ];

      const RETURN_FILTER = ['mint', 'purc'];

      const PERHAPS_MINT_FUNCTION = [];
      let DEFAULT_MINT_FUNCTION = '';

      for (let i = 0; i < abi.length; i++) {
        try {
          if (
            abi[i].inputs[0].type === 'uint256' ||
            (abi[i]?.inputs[1]?.type === 'uint256' &&
              abi[i].outputs.length <= 2 &&
              abi[i].type === 'function')
          ) {
            if (String(abi[i].name).toLowerCase().includes(CONTINUE_FILTER)) {
              continue;
            } else if (
              String(abi[i].name).toLowerCase().includes(RETURN_FILTER) &&
              abi[i].inputs.length === 1
            ) {
              DEFAULT_MINT_FUNCTION = abi[i];
              PERHAPS_MINT_FUNCTION.push(abi[i]);
            } else {
              PERHAPS_MINT_FUNCTION.push(abi[i]);
            }
          }
        } catch (e) {
          continue;
        }
      }
      return {
        defaultMintFunction: DEFAULT_MINT_FUNCTION,
        allMintFunctions: PERHAPS_MINT_FUNCTION
      };
    } catch (e) {
      return {
        defaultMintFunction: abi,
        allMintFunctions: abi
      };
    }
  };

  getBalance = async (address) => {
    try {
      const web3 = new Web3(this.web3Endpoint);
      const resBalance = await web3.eth.getBalance(address);
      return { status: 200, content: { balance: resBalance } };
    } catch (e) {
      return { status: 400, content: { message: e.message } };
    }
  };

  calculateEtherValue = async (
    value,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasMultiplier,
    gasInHeader
  ) => {
    const etherValue = toFixed(
      parseInt(gasLimit) * parseFloat(maxFeePerGas / 1e9) +
        parseFloat(maxPriorityFeePerGas / 1e9) +
        parseFloat(value)
    );

    const rounding = parseFloat(
      parseFloat(String(etherValue)).toFixed(3).replace(/0+$/, '') + 0.001
    );

    return rounding;
  };

  estimateGas = async (
    fromAddress,
    contractAddress,
    data,
    value,
    maxFeePerGas,
    maxPriorityFeePerGas
  ) => {
    try {
      const web3 = new Web3(this.web3Endpoint);
      const gasEstimate = await web3.eth.estimateGas({
        from: fromAddress,
        to: contractAddress,
        value: web3.utils.toHex(
          web3.utils.toWei(Number(value).toString(), 'ether')
        ),
        data: data,
        maxFeePerGas: web3.utils.toHex(
          web3.utils.toWei(Number(maxFeePerGas).toString(), 'gwei')
        ),
        maxPriorityFeePerGas: web3.utils.toHex(
          web3.utils.toWei(Number(maxPriorityFeePerGas).toString(), 'gwei')
        )
      });

      if (String(gasEstimate).toLowerCase().includes('revert'))
        return { success: true, result: false };

      return { success: true, result: true };
    } catch (e) {
      const RETURN_DATA = ['supply', 'insufficient', 'value', 'limit'];
      if (
        String(e.message).toLowerCase().includes('value') ||
        String(e.message).toLowerCase().includes('incorrect') ||
        String(e.message).toLowerCase().includes('limit') ||
        String(e.message).toLowerCase().includes('incorrect ')
      ) {
        return {
          success: false,
          message: e.message
        };
      }
      if (String(e.message).toLowerCase().includes(RETURN_DATA)) {
        return {
          success: false,
          message: e.message
        };
      }
      if (String(e.message).toLowerCase().includes('revert')) {
        return { success: true, result: false };
      }
      return {
        success: false,
        message: e.message
      };
    }
  };

  sendRawTx = async (rawTx, isFlashbot = false) => {
    try {
      if (isFlashbot) {
        const flashbotWeb3 = new Web3('https://rpc.flashbots.net');
        const tx = await flashbotWeb3.eth.sendSignedTransaction(rawTx);
        return {
          success: true,
          txId: tx?.transactionHash || tx?.blockHash
        };
      }
      const ethNodeWeb3 = new Web3(this.web3Endpoint);
      const tx = await ethNodeWeb3.eth.sendSignedTransaction(rawTx);
      return {
        success: true,
        txId: tx?.transactionHash || tx?.blockHash
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  };
  sendTxWithPrivateKey = async (txData, privateKey, isFlashbot) => {
    try {
      const ethNodeWeb3 = new Web3(this.web3Endpoint);
      const signedTx = await ethNodeWeb3.eth.accounts.signTransaction(
        txData,
        privateKey
      );

      const resTx = await this.sendRawTx(signedTx?.rawTransaction, isFlashbot);

      return resTx;
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  };
}

export default Node;

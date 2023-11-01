import axios from 'axios';
import Web3 from 'web3';

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
      throw Error({
        error: 'The contract isn’t correct, check the address again'
      });
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
}

export default Node;

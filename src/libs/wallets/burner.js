import Node from './node';

const sendTx = async (txData, privateKey, isFlashBot) => {
  try {
    const node = new Node(
      'https://eth.getblock.io/mainnet/?api_key=91953f06-fc0a-4a48-87fc-145e8cf6d385'
    );
    const resTx = await node.sendTxWithPrivateKey(
      txData,
      privateKey,
      isFlashBot
    );
    return resTx;
  } catch (e) {
    return {
      success: false,
      message: e.message
    };
  }
};

export default { sendTx };

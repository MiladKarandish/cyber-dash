class SnipeBot {
  constructor(walletType) {
    this.WalletType = walletType;
    generateData = async (
      contractAddress,
      tokenId,
      quantity,
      takerAddress,
      feeBps,
      maxFeePerGas,
      maxPriorityFeePerGas
    ) => {
      try {
        const body = {
          contractAddress: contractAddress,
          tokenId: tokenId,
          quantity: quantity,
          takerAddress: takerAddress,
          feeBps: feeBps,
          maxFeePerGas: maxFeePerGas,
          maxPriorityFeePerGas: maxPriorityFeePerGas
        };

        const res = await fetch(
          'https://api.cyberdash.app/v1/bots/snipe/generate-data',
          {
            method: 'post',
            body: body
          }
        );

        if (res.status !== 200)
          throw new Error(
            res.message || "Can't Generate Data , please call administrator"
          );
      } catch (e) {
        return {
          success: false,
          message: e.message
        };
      }
    };

    signData = async () => {
      if (this.WalletType === 'metamask') {
      } else {
      }
    };
  }
}

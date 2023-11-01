export const VcheckValidateMintInputs = (mintAbi, inputsData) => {
  try {
    let mintInputsType = [];

    for (let i = 0; i < mintAbi.inputs.length; i++) {
      mintInputsType.push(mintAbi.inputs[i].type);
    }

    if (mintInputsType.length !== inputsData.length)
      return {
        status: 400,
        content: { message: 'Invalid Inputs Item Length' }
      };

    for (let k = 0; k < mintInputsType.length; k++) {
      if (String(mintInputsType[k]).toLowerCase().includes('bool')) {
        if (String(inputsData[k]).toLowerCase() === 'false')
          inputsData[k] = false;
        else if (String(inputsData[k]).toLowerCase() === 'true')
          inputsData[k] = true;
        else
          return {
            status: 400,
            content: { message: 'Invalid Type of Boolean' }
          };
      }
      if (String(mintInputsType[k]).toLowerCase().includes('int')) {
        if (String(inputsData[k]).match(/^[0-9]+$/) == null)
          return {
            status: 400,
            content: { message: 'Invalid Type uint256' }
          };

        inputsData[k] = parseInt(inputsData[k]);
      }
      if (String(mintInputsType[k]).toLowerCase().includes('byte')) {
        inputsData[k] = String(inputsData[k]);
      }
    }
    return {
      status: 200,
      content: { inputData: inputsData }
    };
  } catch (e) {
    return {
      status: 400,
      content: { message: e.message }
    };
  }
};

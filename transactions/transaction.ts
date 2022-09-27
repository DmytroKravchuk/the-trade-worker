import {BigNumber} from "ethers";

const providerHandler = require("../providers/test-provider")

const Transaction = async () => {
    const gasPrice: BigNumber = await providerHandler().provider.eth.getGasPrice()
    return {
        gasPrice
    }
}

module.exports = Transaction

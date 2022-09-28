// @ts-ignore
const providerHandler = require("../providers/test-provider-ethers")

const TransactionEthers = async () => {
    const gasPrice = await providerHandler().provider.getGasPrice()
    return {
        gasPrice
    }
}

module.exports = TransactionEthers

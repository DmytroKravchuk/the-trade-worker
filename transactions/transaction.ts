// @ts-ignore
const providerHandler = require("../providers/test-provider")

const Transaction = async () => {
    const gasPrice = await providerHandler().provider.eth.getGasPrice()
    return {
        gasPrice
    }
}

module.exports = Transaction

require('dotenv').config();
const {ethers} = require("ethers");
const Web3 = require("web3")

const TestProvider = () => {
    const provider = new Web3(process.env.PROVIDER);
    const signer = provider.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
    return {
        provider,
        signer
    }
}

module.exports = TestProvider

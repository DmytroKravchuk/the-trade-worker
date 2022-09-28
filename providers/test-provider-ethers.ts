require('dotenv').config();
// @ts-ignore
const ethers = require('ethers');


const TestProviderEthers = () => {
    const customHttpProvider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, customHttpProvider);

    customHttpProvider.getBlockNumber().then((result: any) => {
        console.log("Current block number: " + result);
    });

    return {
        wallet,
        provider: customHttpProvider
    }
}

module.exports = TestProviderEthers

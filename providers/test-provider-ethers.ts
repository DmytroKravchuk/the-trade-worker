require('dotenv').config();
// @ts-ignore
const ethers = require('ethers');


const TestProviderEthers = () => {
    const wsProvider  = new ethers.providers.WebSocketProvider(process.env.PROVIDER);
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, wsProvider );

    wsProvider .getBlockNumber().then((result: any) => {
        console.log("Current block number: " + result);
    });

    return {
        wallet,
        provider: wsProvider
    }
}

module.exports = TestProviderEthers

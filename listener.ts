const BigNumber = require('bignumber.js');
require('dotenv').config();
const web3 = require("web3")
const CONTROLLER = require("./abi/Controller.json")
const tokenUSDT = require("./abi/TokenUSDT.json")
const tokenPP = require("./abi/TokenPP.json")
// @ts-ignore
const providerHandler = require("./providers/test-provider")
const TOKEN =  process.env.TOKEN
const CONTROLLER_ADDRESS = process.env.CONTROLLER
const ADDRESS_NIKOLAI = process.env.ADDRESS_NIKOLAI
const ADDRESS_DIMA = process.env.ADDRESS_DIMA
const TOKEN_PP_ADDRESS = process.env.CONTRACT_ADR_TOKEN_PP
const TOKEN_USDT_ADDRESS = process.env.CONTRACT_ADR_TOKEN_USDT

// @ts-ignore
const Listener = async ({gasPrice}) => {
    const {signer, provider} = providerHandler()
    const getContract = async () => {
        const contractController = await new provider.eth.Contract(CONTROLLER.abi, CONTROLLER_ADDRESS)
        const contractPP = await new provider.eth.Contract(tokenPP.abi, TOKEN_PP_ADDRESS)
        const contractUSDT = await new provider.eth.Contract(tokenUSDT.abi, TOKEN_USDT_ADDRESS)

        return {
            contractController,
            contractPP,
            contractUSDT
        }
    }

    getContract().then(async ({contractPP,contractController,contractUSDT}) => {
        const transactionPP = contractPP.methods.transfer(ADDRESS_NIKOLAI, 1*(10*18))
        const encodedTransactionPP = transactionPP.encodeABI()
        const tx = {
            from: signer.address,
            to: process.env.CONTRACT_ADR_TOKEN_PP,
            gas: 2000000,
            data: encodedTransactionPP
        };
        ///////////////
        const approveTT = contractPP.methods.approve(CONTROLLER_ADDRESS,10*(10**18));
        const encodedApprov = approveTT.encodeABI();
        const approvetx = {
            from:signer.address,
            to:contractPP.address,
            gas:2000000,
            data:encodedApprov
        }
        ///////////////////////
        const executionOrderFee = "3000000000000000";
        const createOrder = contractController.methods.createOrder(
            3000,
            contractUSDT.address,
            contractPP.address,
            0,
            -276420
            ,0
            ,
            10*(10**18),
            "10066188345021311699",
            0,
            "20000000000000"
        );
        const encodedCreatedOrder = createOrder.encodeABI();
        const createorderTx = {
            from:signer.address,
            to:contractPP.address,
            value:executionOrderFee,// если функции в контракта payable  то этот параметр нужно указывать
            gas:2000000,
            data:encodedCreatedOrder
        }

        // provider.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY).then((signed: any) => {
        //     provider.eth.sendSignedTransaction(signed.rawTransaction).then((result: any) =>{
        //         console.log(result.transactionHash)
        //     })
        // })
    })
}

module.exports = Listener;

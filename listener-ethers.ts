// @ts-ignore
import {BigNumber} from "ethers";

const ethers = require('ethers');
require('dotenv').config();
const web3 = require("web3")
const CONTROLLER = require("./abi/Controller.json")
const tokenUSDT = require("./abi/TokenUSDT.json")
const tokenPP = require("./abi/TokenPP.json")
// @ts-ignore
const providerHandler = require("./providers/test-provider-ethers")
const TOKEN =  process.env.TOKEN
const CONTROLLER_ADDRESS = process.env.CONTROLLER
const ADDRESS_NIKOLAI = process.env.ADDRESS_NIKOLAI
const ADDRESS_DIMA = process.env.ADDRESS_DIMA
const TOKEN_PP_ADDRESS = process.env.CONTRACT_ADR_TOKEN_PP
const TOKEN_USDT_ADDRESS = process.env.CONTRACT_ADR_TOKEN_USDT

// @ts-ignore
const ListenerEthers = async ({ gasPrice }) => {
    const {wallet, provider} = providerHandler()
    const getContract = async () => {
        const contractController = await new ethers.Contract(CONTROLLER_ADDRESS, CONTROLLER.abi, provider)
        const contractPP = await new ethers.Contract(TOKEN_PP_ADDRESS, tokenPP.abi, provider)
        const contractUSDT = await new ethers.Contract(TOKEN_USDT_ADDRESS, tokenUSDT.abi, provider)
        //
        return {
            contractController,
            contractPP,
            contractUSDT
        }
    }

    getContract().then(async ({contractPP, contractController, contractUSDT}) => {

        // const transactionPP = await contractPP.connect(wallet).approve(CONTROLLER_ADDRESS, BigNumber.from("10000000000000000000"))

        const executionOrderFee = "3000000000000000";
        const contractParams = {
            fee: 3000,
            token0: TOKEN_USDT_ADDRESS,
            token1: TOKEN_PP_ADDRESS,
            tickLower: 0,
            tickUpper: -276420,
            amountOfToken0: 0,
            recievedAmountOfToken0: BigNumber.from("1000000000000000").toNumber(),
            recievedAmountOfToken1: BigNumber.from("1000000000000000").toNumber(),
            deadline: BigNumber.from("1000000000000000").toNumber(),
            orderType: 0,
        };
        const createOrder = await contractController.connect(wallet).createOrder(contractParams, {value: executionOrderFee})
        // const encodedTransactionPP = transactionPP.encodeABI()
        // const tx = {
        //     from: signer.address,
        //     to: process.env.CONTRACT_ADR_TOKEN_PP,
        //     gas: 2000000,
        //     data: encodedTransactionPP
        // };
        // ///////////////
        // const approveTT = contractPP.methods.approve(CONTROLLER_ADDRESS, 1000000000000000);
        // const encodedApprov = approveTT.encodeABI();
        // const approvetx = {
        //     from:signer.address,
        //     to:contractPP.address,
        //     gas:20000000,
        //     data:encodedApprov
        // }
        // ///////////////////////
        // const executionOrderFee = "3000000000000000";
        // const contractParams = {
        //     fee: 3000,
        //     token0: contractUSDT.options.address,
        //     token1: contractPP.options.address,
        //     tickLower: 0,
        //     tickUpper: -276420,
        //     amountOfToken0: 0,
        //     recievedAmountOfToken0: 1000000000000000,
        //     recievedAmountOfToken1: 1000000000000000,
        //     deadline: 1000000000000000,
        //     orderType: 0,
        // }
        // const createOrder = contractController.methods.createOrder(contractParams);
        // const encodedCreatedOrder = createOrder.encodeABI();
        // const createorderTx = {
        //     from:signer.address,
        //     to:contractPP.address,
        //     value:executionOrderFee,// если функции в контракта payable  то этот параметр нужно указывать
        //     gas:2000000,
        //     data:encodedCreatedOrder
        // }

        // provider.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY).then((signed: any) => {
        //     provider.eth.sendSignedTransaction(signed.rawTransaction).then((result: any) =>{
        //         console.log(result.transactionHash)
        //     })
        // })
    })
}

module.exports = ListenerEthers;

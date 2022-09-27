"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BigNumber = require('bignumber.js');
require('dotenv').config();
const web3 = require("web3");
const CONTROLLER = require("./abi/Controller.json");
const tokenUSDT = require("./abi/TokenUSDT.json");
const tokenPP = require("./abi/TokenPP.json");
// @ts-ignore
const providerHandler = require("./providers/test-provider");
const TOKEN = process.env.TOKEN;
const CONTROLLER_ADDRESS = process.env.CONTROLLER;
const ADDRESS_NIKOLAI = process.env.ADDRESS_NIKOLAI;
const ADDRESS_DIMA = process.env.ADDRESS_DIMA;
const TOKEN_PP_ADDRESS = process.env.CONTRACT_ADR_TOKEN_PP;
const TOKEN_USDT_ADDRESS = process.env.CONTRACT_ADR_TOKEN_USDT;
// @ts-ignore
const Listener = ({ gasPrice }) => __awaiter(void 0, void 0, void 0, function* () {
    const { signer, provider } = providerHandler();
    const getContract = () => __awaiter(void 0, void 0, void 0, function* () {
        const contractController = yield new provider.eth.Contract(CONTROLLER.abi, CONTROLLER_ADDRESS);
        const contractPP = yield new provider.eth.Contract(tokenPP.abi, TOKEN_PP_ADDRESS);
        const contractUSDT = yield new provider.eth.Contract(tokenUSDT.abi, TOKEN_USDT_ADDRESS);
        return {
            contractController,
            contractPP,
            contractUSDT
        };
    });
    getContract().then(({ contractPP, contractController, contractUSDT }) => __awaiter(void 0, void 0, void 0, function* () {
        const transactionPP = contractPP.methods.transfer(ADDRESS_NIKOLAI, 1 * (10 * 18));
        const encodedTransactionPP = transactionPP.encodeABI();
        const tx = {
            from: signer.address,
            to: process.env.CONTRACT_ADR_TOKEN_PP,
            gas: 2000000,
            data: encodedTransactionPP
        };
        ///////////////
        const approveTT = contractPP.methods.approve(CONTROLLER_ADDRESS, BigNumber("10000000000000000000"));
        const encodedApprov = approveTT.encodeABI();
        const approvetx = {
            from: signer.address,
            to: contractPP.address,
            gas: 2000000,
            data: encodedApprov
        };
        ///////////////////////
        const executionOrderFee = "3000000000000000";
        const createOrder = contractController.methods.createOrder({
            fee: 3000,
            token0: contractUSDT.options.address,
            token1: contractPP.options.address,
            tickLower: 0,
            tickUpper: BigNumber(-276420),
            amountOfToken0: 0,
            recievedAmountOfToken0: BigNumber("10000000000000000000"),
            recievedAmountOfToken1: BigNumber("10066188345021311699"),
            deadline: BigNumber("20000000000000"),
            orderType: 0
        });
        const encodedCreatedOrder = createOrder.encodeABI();
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
    }));
});
module.exports = Listener;

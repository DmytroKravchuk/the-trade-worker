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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const web3 = require("web3");
const eventTransfer = require("./events/transfer");
const { ethers } = require("ethers");
const Controller_json_1 = __importDefault(require("./abi/Controller.json"));
const TokenUSDT_json_1 = __importDefault(require("./abi/TokenUSDT.json"));
const TokenPP_json_1 = __importDefault(require("./abi/TokenPP.json"));
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
        const contractController = yield new provider.eth.Contract(Controller_json_1.default.abi, CONTROLLER_ADDRESS);
        const contractPP = yield new provider.eth.Contract(TokenPP_json_1.default.abi, TOKEN_PP_ADDRESS);
        const contractUSDT = yield new provider.eth.Contract(TokenUSDT_json_1.default.abi, TOKEN_USDT_ADDRESS);
        return {
            contractController,
            contractPP,
            contractUSDT
        };
    });
    getContract().then(({ contractPP }) => __awaiter(void 0, void 0, void 0, function* () {
        contractPP.events.Approval({
            filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' },
            fromBlock: 0
        }, function (error, event) { console.log(event); })
            .on("connected", function (subscriptionId) {
            console.log(subscriptionId);
        })
            .on('data', function (event) {
            console.log(event);
        })
            .on('changed', function (event) {
            // remove event from local database
        })
            .on('error', function (error, receipt) {
            console.log(receipt);
            console.log(error);
        });
        const transactionPP = contractPP.methods.transfer(ADDRESS_NIKOLAI, 1 * (10 * 18));
        const encodedTransactionPP = transactionPP.encodeABI();
        const tx = {
            from: signer.address,
            to: process.env.CONTRACT_ADR_TOKEN_PP,
            gas: 2000000,
            data: encodedTransactionPP
        };
        // provider.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY).then((signed: any) => {
        //     provider.eth.sendSignedTransaction(signed.rawTransaction).then((result: any) => {
        //         console.log(result)
        //     })
        // })
    }));
});
module.exports = Listener;

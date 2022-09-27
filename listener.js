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
const fs = require("fs");
require('dotenv').config();
const WEB3 = require("web3");
const bigNumber = require("@ethersproject/bignumber");
const { ethers } = require("ethers");
const CONTROLLER = require("./abi/Controller.json");
const tokenUSDT = require("./abi/TokenUSDT.json");
const tokenPP = require("./abi/TokenPP.json");
const TOKEN = process.env.TOKEN;
const CONTROLLER_ADDRESS = process.env.CONTROLLER;
const ADDRESS_OWNER = process.env.ADDRESS_OWNER;
const TOKEN_PP_ADDRESS = process.env.CONTRACT_ADR_TOKEN_PP;
const TOKEN_USDT_ADDRESS = process.env.CONTRACT_ADR_TOKEN_USDT;
const listener = () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);
    const signer = provider.getSigner();
    const getContract = () => __awaiter(void 0, void 0, void 0, function* () {
        const contractController = yield new ethers.Contract(CONTROLLER_ADDRESS, CONTROLLER.abi, provider);
        const contractPP = yield new ethers.Contract(TOKEN_PP_ADDRESS, tokenPP.abi, provider);
        const contractUSDT = yield new ethers.Contract(TOKEN_USDT_ADDRESS, tokenUSDT.abi, provider);
        return {
            contractController,
            contractPP,
            contractUSDT
        };
    });
    const { contractController, contractPP, contractUSDT } = getContract();
    contractUSDT.on("Transfer", (to, amount, from) => {
        console.log(to, amount, from);
    });
};
module.exports = listener;

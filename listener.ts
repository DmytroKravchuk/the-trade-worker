const fs = require("fs")
require('dotenv').config();
const WEB3 = require("web3")
const bigNumber = require("@ethersproject/bignumber")
const { ethers } = require("ethers");
const CONTROLLER = require("./abi/Controller.json")
const tokenUSDT = require("./abi/TokenUSDT.json")
const tokenPP = require("./abi/TokenPP.json")

const TOKEN =  process.env.TOKEN
const CONTROLLER_ADDRESS = process.env.CONTROLLER
const ADDRESS_OWNER = process.env.ADDRESS_OWNER
const TOKEN_PP_ADDRESS = process.env.CONTRACT_ADR_TOKEN_PP
const TOKEN_USDT_ADDRESS = process.env.CONTRACT_ADR_TOKEN_USDT

const listener = () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);
    const signer = provider.getSigner()
    const getContract = async () => {
        const contractController = await new ethers.Contract(CONTROLLER_ADDRESS, CONTROLLER.abi, provider)
        const contractPP = await new ethers.Contract(TOKEN_PP_ADDRESS, tokenPP.abi, provider)
        const contractUSDT = await new ethers.Contract(TOKEN_USDT_ADDRESS, tokenUSDT.abi, provider)

        return {
            contractController,
            contractPP,
            contractUSDT
        }
    }

    const {contractController, contractPP, contractUSDT } = getContract()
    console.log(getContract().then(data => console.log(data)))
}

module.exports = listener;

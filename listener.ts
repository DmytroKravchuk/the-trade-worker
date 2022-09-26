const fs = require("fs")
require('dotenv').config();
const WEB3 = require("web3")
const bigNumber = require("@ethersproject/bignumber")
const { ethers } = require("ethers");
import CONTROLLER from "./abi/Controller.json"
import tokenUSDT from "./abi/TokenUSDT.json"
import tokenPP from "./abi/TokenPP.json"

const TOKEN =  process.env.TOKEN
const CONTROLLER_ADDRESS = process.env.CONTROLLER
const ADDRESS_OWNER = process.env.ADDRESS_OWNER
const TOKEN_PP_ADDRESS = process.env.CONTRACT_ADR_TOKEN_PP
const TOKEN_USDT_ADDRESS = process.env.CONTRACT_ADR_TOKEN_USDT

const Listener = () => {
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

    const data = getContract().then(d => console.log(d))

    // data.contractUSDT.on("Transfer",(to: any ,amount: any, from: any)=>{
    //     console.log(to, amount, from);
    // })
}

module.exports = Listener;

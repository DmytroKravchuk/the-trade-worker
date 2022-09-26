const fs = require("fs")
require('dotenv').config();
const WEB3 = require("web3")
const bigNumber = require("@ethersproject/bignumber")
const CONTROLLER = require("./ERC20.json")

const listener = () => {
    const provider =  process.env.PROVIDER
    const token =  process.env.TOKEN
    const controllerAddress = process.env.CONTROLLER

    const we3Provider = new WEB3(provider)
    we3Provider.eth.setProvider(provider)

   const contractController = new we3Provider.eth.Contract([CONTROLLER], token)

    const getBitsRoles = async () => {
        return await contractController.methods.decimals.call()
    }

    console.log(getBitsRoles())
}

module.exports = listener;

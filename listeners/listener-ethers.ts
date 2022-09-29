// @ts-ignore
import {BigNumber, utils} from "ethers";

const ethers = require('ethers');
require('dotenv').config();
const web3 = require("web3")
const CONTROLLER = require("../abi/Controller.json")
const tokenUSDT = require("../abi/TokenUSDT.json")
const tokenPP = require("../abi/TokenPP.json")
// @ts-ignore
const providerHandler = require("../providers/test-provider-ethers")
const TOKEN =  process.env.TOKEN
const CONTROLLER_ADDRESS = process.env.CONTROLLER
const CONTROLLER_ADDRESS_PROXY = process.env.CONTROLLER_PROXY
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

    const filter = {
        address: CONTROLLER_ADDRESS,
        topics: [
            utils.id(`CreateOrder(address,address,uint256,int24,int24,uint8)`
            ),
        ]
    }
    const {contractController, contractPP, contractUSDT} = await getContract()

    const sendHandler = async ({address2, uint256}: any) => {
        // await contractController.connect(wallet).executeOrder(uint256, address2)
        await contractController.connect(wallet).cancelOrder(uint256, address2)
    }

    contractController.on(filter, (address1: any, address2: any, uint256: any, int24: any, int24_2: any, OrderType: any) => {
        sendHandler({address2, uint256})
    })
}

module.exports = ListenerEthers;

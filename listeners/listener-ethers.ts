// @ts-ignore
import {BigNumber, utils} from "ethers";
const ethers = require('ethers');
require('dotenv').config();

const generateCurrentTick = require("../generateCurrentTick")
import CONTROLLER from "../abi/Controller.json"
const changeTick = require('../changeTick')
const approveToken = require('../approveToken')
// @ts-ignore
const providerHandler = require("../providers/test-provider-ethers")

const CONTROLLER_ADDRESS = process.env.CONTROLLER
const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS

// @ts-ignore
const ListenerEthers = async ({ gasPrice }) => {
    const {wallet, provider} = providerHandler()
    const getContract = async () => {
        const contractController = await new ethers.Contract(CONTROLLER_ADDRESS, CONTROLLER.abi, provider)
        return {
            contractController
        }
    }

    const filter = {
        address: CONTROLLER_ADDRESS,
        topics: [
            utils.id(`CreateOrder(address,address,uint256,int24,int24,uint8)`
            ),
        ]
    }
    const {contractController} = await getContract()

    const sendHandler = async ({address2, uint256}: any) => {
        await contractController.connect(wallet).executeOrder(uint256, address2).then(() => {
            console.log('Order Executed')
        })

        // await contractController.connect(wallet).cancelOrder(uint256, address2).then(() => {
        //     console.log('Cancel Order')
        // })
    }

    contractController.on(filter, (address1: any, address2: any, uint256: any, int24: any, int24_2: any, OrderType: any) => {
        const amount = BigNumber.from("100000000000000000000000")
        console.log("int24")
        console.log(int24)
        console.log(int24_2)
        generateCurrentTick({poolAddress: address2, provider}).then(({token0, token1, slot0, poolContract}: any) => {
            approveToken({
                address: token0,
                address2: ROUTER_ADDRESS,
                provider, wallet,
                amount: amount
            }).then(async () => {
               await approveToken({
                    address: token1,
                    address2: ROUTER_ADDRESS,
                    provider, wallet,
                    amount: amount
                })
                changeTick({
                    token0,
                    token1,
                    amount: amount,
                    desiredTick: slot0.tick,
                    provider,
                    wallet,
                    poolContract,
                    int24,
                    int24_2
                }).then(() => {
                   console.log("sendHandler")
                   sendHandler({address2, uint256})
                })
            })
        })

    })
}

module.exports = ListenerEthers;

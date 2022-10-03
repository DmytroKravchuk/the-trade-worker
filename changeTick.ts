import {BigNumber} from "ethers";
const ethers = require('ethers');
import SwapRouter from "./abi/SwapRouter.json"

const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS || ""

const changeTick = async ({token0, token1, amount, provider, wallet, poolContract, int24, int24_2}: any) => {
    const contractController = await new ethers.Contract(ROUTER_ADDRESS, SwapRouter.abi, provider)
    const executionFee: BigNumber = ethers.utils.parseEther("0.003");
    let currentTick = (await poolContract.slot0()).tick;
    console.log(`int24 ${int24}`)
    console.log(`int24_2 ${int24_2}`)
    while(!(currentTick >= int24 && currentTick <= int24_2)) {
        currentTick = (await poolContract.slot0()).tick;
        console.log(`Current tick: ${currentTick}`)
        const swap = await contractController.connect(wallet).exactInputSingle({
            tokenIn: token1,
            tokenOut: token0,
            fee: 3000,
            recipient: wallet.address,
            deadline: 1e10,
            amountIn: amount,
            amountOutMinimum: 1,
            sqrtPriceLimitX96: 0
        }, {
            value: executionFee
        })
        await swap.wait();
        currentTick = (await poolContract.slot0()).tick;
        console.log(`Current tick end: ${currentTick}`)
    }
}

module.exports = changeTick


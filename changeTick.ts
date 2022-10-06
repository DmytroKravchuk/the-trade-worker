import {BigNumber} from 'ethers';

const ethers = require('ethers');
const approveToken = require('./approveToken');

import SwapRouter from './abi/SwapRouter.json';

const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS || '';
const executionFee: BigNumber = ethers.utils.parseEther('0.003');

const swapFunc = async ({contractController, wallet, tokenIn, tokenOut, amountIn}: any) => {
    return await contractController.connect(wallet).exactInputSingle(
        {
            tokenIn,
            tokenOut,
            fee: 3000,
            recipient: wallet.address,
            deadline: 1e10,
            amountIn,
            amountOutMinimum: 1,
            sqrtPriceLimitX96: 0,
        },
        {
            value: executionFee,
        },
    );
}

const changeTick = async ({
  token0,
  token1,
  provider,
  wallet,
  poolContract,
  int24,
  int24_2,
  OrderType
}: any) => {
    const contractController = await new ethers.Contract(
        ROUTER_ADDRESS,
        SwapRouter.abi,
        provider,
    );
    let currentTick = (await poolContract.slot0()).tick;
    let tokenStepToSwap: BigNumber = BigNumber.from(1000).mul(18);
    const desiredTick = OrderType === 0 ? int24_2 : int24;
    const increseTick = desiredTick >= currentTick;
    let percentage = currentTick / desiredTick * 100;

    while (increseTick ? currentTick <= desiredTick : currentTick >= desiredTick) {
        currentTick = (await poolContract.slot0()).tick;
        console.log(`Current tick: ${currentTick}`);

        let new_percentage = currentTick / desiredTick * 100;
        if(new_percentage - percentage <= 0.1){
            tokenStepToSwap = tokenStepToSwap.mul(10000);
        } else if (new_percentage - percentage <= 4){
            tokenStepToSwap = tokenStepToSwap.mul(5000);
        }
        const amountToSwap: BigNumber = tokenStepToSwap;
        console.log('approveToken')
        const trx = await approveToken({address: token1, address2: ROUTER_ADDRESS, provider, wallet, amount: amountToSwap});
        trx.wait();
        console.log(trx);
        const trx1 = await approveToken({address: token1, address2: ROUTER_ADDRESS, provider, wallet, amount: amountToSwap});
        trx1.wait();
        console.log(trx1);
        const trx2 = await approveToken({address: token1, address2: ROUTER_ADDRESS, provider, wallet, amount: amountToSwap});
        trx2.wait();
        console.log(trx2);
        
        console.log('swap')
        const swap = await swapFunc({
            contractController,
            wallet,
            amountIn: amountToSwap,
            tokenIn: token0,
            tokenOut: token1
        })
        await swap.wait();
        currentTick = (await poolContract.slot0()).tick;
        console.log(`Current tick end: ${currentTick}`);
    }
};

module.exports = changeTick;

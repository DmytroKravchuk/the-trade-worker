// @ts-ignore
const ethers = require("ethers");
import UniswapV3Pool from './abi/UniswapV3Pool.json'

const generateCurrentTick = async ({poolAddress, provider}: any) => {
    const poolContract = await new ethers.Contract(poolAddress, UniswapV3Pool.abi, provider)
    const token0 = await poolContract.token0()
    const token1 = await poolContract.token1()
    const slot0 = await poolContract.slot0()

    return {
        token0,
        token1,
        slot0,
        poolContract
    }
}

module.exports = generateCurrentTick

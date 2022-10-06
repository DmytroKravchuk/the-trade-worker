import {BigNumber} from "ethers";

const ethers = require('ethers');

import TokenUSDT from "./abi/TokenUSDT.json"

const approveToken = async ({address, address2, provider, wallet, amount}: any) => {
    const contractToken = await new ethers.Contract(address, TokenUSDT.abi, provider)
    const allowance: BigNumber = await contractToken.allowance(wallet.address, address2)
    if(!allowance.eq(amount)) {
        const approveTx = await contractToken.connect(wallet).approve(address2, amount).then((data: any) => {
            console.log(`Approve to ${address2} with ${amount}`)
            return data;
        })
        return approveTx
        
    }
    console.log(`Allowance ${allowance}`)
}

module.exports = approveToken;

import {BigNumber} from "ethers";
import {Token} from "./types";
import { JsonRpcProvider } from '@ethersproject/providers';

export interface ICreateOrder {
    tokenA: Token,
    tokenB: Token,
    fee: number,
    pairAddress: string,
    chainId: number,
    price: string,
    tokenAmount: BigNumber,
    receiveAmount: BigNumber,
    transactionDeadLine: string,
    provider: JsonRpcProvider
}

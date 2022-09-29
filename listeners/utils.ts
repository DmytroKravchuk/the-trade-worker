import {ICreateOrder} from "../interfaces";
import {BigNumber} from "ethers";

type CreateOrderProps = {
    contractController: any,
    wallet: any,
    contractParams: ICreateOrder
    value: {
        value: BigNumber
    }
}
export const createOrder = async ({contractController, wallet, contractParams, value}: CreateOrderProps) => {
    return await contractController.connect(wallet).createOrder(contractParams, value)
}

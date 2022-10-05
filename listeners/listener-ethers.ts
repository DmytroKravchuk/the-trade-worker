// @ts-ignore
import {BigNumber, utils} from 'ethers';

const ethers = require('ethers');
require('dotenv').config();

const generateCurrentTick = require('../generateCurrentTick');
import CONTROLLER from '../abi/Controller.json';

const changeTick = require('../changeTick');
// @ts-ignore
const providerHandler = require('../providers/test-provider-ethers');

const CONTROLLER_ADDRESS = process.env.CONTROLLER;
const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS;

// @ts-ignore
const ListenerEthers = async ({gasPrice}) => {
    const {wallet, provider} = providerHandler();
    const getContract = async () => {
        const contractController = await new ethers.Contract(
            CONTROLLER_ADDRESS,
            CONTROLLER.abi,
            provider,
        );
        return {
            contractController,
        };
    };
    const filter = {
        address: CONTROLLER_ADDRESS,
        topics: [
            utils.id(`CreateOrder(address,address,uint256,int24,int24,uint8)`),
        ],
    };
    const {contractController} = await getContract();

    const sendHandler = async ({address2, uint256}: any) => {
        const executeTRX = await contractController
            .connect(wallet)
            .executeOrder(uint256, address2)
            .then(() => {
                console.log('Order Executed');
                console.log(executeTRX);
            });

        // await contractController.connect(wallet).cancelOrder(uint256, address2).then(() => {
        //     console.log('Cancel Order')
        // })
    };

    //////
    // "desiredTick":
    //     This is desired tick to achive.
    //      In case to close order desired tick whould be "tickUpper" from orders() function for order type 0
    //       (Buy Limit), and "tickLower" for order type 1 (Take Profit).
    //надо кароче через if/else подбирать тик и свапать так же, главное починить цикл на апруве и свапе

    contractController.on(filter, (address1: any, address2: any, uint256: any, int24: any, int24_2: any, OrderType: any,) => {
            generateCurrentTick({poolAddress: address2, provider})
                .then(async ({
                   token0,
                   token1,
                   slot0,
                   poolContract
               }: any) => {
                    changeTick({
                        token0,
                        token1,
                        desiredTick: slot0.tick,
                        provider,
                        wallet,
                        poolContract,
                        int24,
                        int24_2,
                        OrderType
                    }).then(() => {
                        console.log('sendHandler');
                        sendHandler({address2, uint256});
                    });
                },
            );
        },
    );
};

module.exports = ListenerEthers;

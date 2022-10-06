// @ts-ignore
import {BigNumber, utils} from 'ethers';

const ethers = require('ethers');
require('dotenv').config();

const generateCurrentTick = require('../generateCurrentTick');
import CONTROLLER from './abi/Controller.json';
import Token from './abi/ERC20.json';
const changeTick = require('../changeTick');
// @ts-ignore
const provider = process.env.PROVIDER;
const CONTROLLER_ADDRESS = process.env.CONTROLLER;
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider );
const AddrLuna = process.env.CONTRACT_ADR_TOKEN_LUNA;
const AddrDOGI = process.env.CONTRACT_ADR_TOKEN_DOGE;
const amount = BigNumber.from("1000000000000000000");

const CreateOrder = async()=>{
const tokenLuna = await new ethers.Contract(AddrLuna,Token.abi,provider);    
const contractController = await new ethers.Contract(CONTROLLER_ADDRESS,CONTROLLER.abi,provider,);
    const approveTRX = await  tokenLuna.connect(wallet).approve(CONTROLLER_ADDRESS,amount);
    approveTRX.wait();
    console.log(approveTRX);
    const receiveramount = BigNumber.from("961752584437059628");
    const order = contractController.connect(wallet).createOrder({
        token0: AddrLuna,
        token1: AddrDOGI,
        tickLower:360,
        tickUpper:420,
        amountOfToken0:amount,
        amountOfToken1:0,
        recievedAmountOfToken0:amount,
        recievedAmountOfToken1:receiveramount,
        deadline:1865046691068,
        orderType:1
    },{
        value:3000000000000000
    });
    order.wait();
    console.log(order);

}

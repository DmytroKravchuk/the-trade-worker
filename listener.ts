require('dotenv').config();
const web3 = require("web3")
const eventTransfer = require("./events/transfer")
const { ethers } = require("ethers");
import CONTROLLER from "./abi/Controller.json"
import tokenUSDT from "./abi/TokenUSDT.json"
import tokenPP from "./abi/TokenPP.json"
const providerHandler = require("./providers/test-provider")
const TOKEN =  process.env.TOKEN
const CONTROLLER_ADDRESS = process.env.CONTROLLER
const ADDRESS_NIKOLAI = process.env.ADDRESS_NIKOLAI
const ADDRESS_DIMA = process.env.ADDRESS_DIMA
const TOKEN_PP_ADDRESS = process.env.CONTRACT_ADR_TOKEN_PP
const TOKEN_USDT_ADDRESS = process.env.CONTRACT_ADR_TOKEN_USDT

// @ts-ignore
const Listener = async ({gasPrice}) => {
    const {signer, provider} = providerHandler()
    const getContract = async () => {
        const contractController = await new provider.eth.Contract(CONTROLLER.abi, CONTROLLER_ADDRESS)
        const contractPP = await new provider.eth.Contract(tokenPP.abi, TOKEN_PP_ADDRESS)
        const contractUSDT = await new provider.eth.Contract(tokenUSDT.abi, TOKEN_USDT_ADDRESS)

        return {
            contractController,
            contractPP,
            contractUSDT
        }
    }

    getContract().then(async ({contractPP}) => {
        contractPP.events.Approval({
            filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'},
            fromBlock: 0
        }, function(error: any, event: any){ console.log(event); })
            .on("connected", function(subscriptionId: any){
                console.log(subscriptionId);
            })
            .on('data', function(event: any){
                console.log(event);
            })
            .on('changed', function(event: any){
                // remove event from local database
            })
            .on('error', function(error: any, receipt: any) {
                console.log(receipt);
                console.log(error);
            });
        const transactionPP = contractPP.methods.transfer(ADDRESS_NIKOLAI, 1*(10*18))
        const encodedTransactionPP = transactionPP.encodeABI()
        const tx = {
            from: signer.address,
            to: process.env.CONTRACT_ADR_TOKEN_PP,
            gas: 2000000,
            data: encodedTransactionPP
        };

        // provider.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY).then((signed: any) => {
        //     provider.eth.sendSignedTransaction(signed.rawTransaction).then((result: any) => {
        //         console.log(result)
        //     })
        // })
    })
}

module.exports = Listener;

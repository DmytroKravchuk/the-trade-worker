"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const express = require("express");
// @ts-ignore
// const listener = require('./listener')
const listenerEthers = require('./listener-ethers');
// const transaction = require('./transactions/transaction')
const transactionEthers = require('./transactions/transaction-ethers');
// const router = require("./router");
const PORT = process.env.PORT || 8080;
const app = express();
const expressWs = require('express-ws')(app);
app.use(express.json());
app.use("/", () => { });
const initServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.get('/', (req, res, next) => {
            res.send({
                "test": "Hello!"
            });
        });
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        // @ts-ignore
        transactionEthers().then(({ gasPrice }) => {
            // listener({gasPrice})
            listenerEthers({ gasPrice });
        });
    }
    catch (e) {
        console.log(e);
    }
});
initServer();

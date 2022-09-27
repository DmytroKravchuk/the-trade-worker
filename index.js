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
const listener = require('./listener.ts');
// const router = require("./router");
const PORT = process.env.PORT || 5000;
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
        listener();
    }
    catch (e) {
        console.log(e);
    }
});
initServer();

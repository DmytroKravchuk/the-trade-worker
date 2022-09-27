require('dotenv').config();
const express = require("express");

// @ts-ignore
const listener = require('./listener')
const transaction = require('./transactions/transaction')

// const router = require("./router");

const PORT = process.env.PORT || 8080;

const app = express();
const expressWs = require('express-ws')(app);

app.use(express.json());
app.use("/", () => {});

const initServer = async () => {
    try {
        app.get('/', (req: any, res: any, next: any) => {
            res.send({
                "test": "Hello!"
            })
        });

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

        // @ts-ignore
        transaction().then(({gasPrice}) => {
            listener({gasPrice})
        })

    } catch (e) {
        console.log(e);
    }
}

initServer()


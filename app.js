import dotenv from 'dotenv';
import express from 'express';
import storageBd from './routers/routes.js'
dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use("/app", storageBd);

const config=JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
});
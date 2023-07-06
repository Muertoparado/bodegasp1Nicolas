import dotenv from 'dotenv';
import express from 'express';
import storageBd from './routers/routes.js'
import body_parser from 'body-parser';
dotenv.config();
const appExpress = express();

appExpress.use(express.json());
//appExpress.use(body_parser.urlencoded({extended:true}));
appExpress.use("/app", storageBd);

const config=JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
});
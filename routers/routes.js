import Router from 'express';
import mysql from 'mysql2';
const storageBd= Router();
let con= undefined;

storageBd.use((req, res, next)=>{
    let myConfig=JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig);
    next();
});

storageBd.get("/bodegas", (req, res) => {
    con.query(/*sql*/`SELECT * FROM bodegas ORDER BY nombre`,
    (err,data,fil)=>{
        res.send(JSON.stringify(data));
        res.end(json.stringify(data));
    }
    )
})

export default storageBd;

import Router from 'express';
import { request } from 'http';
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
        res.end(JSON.stringify(data));
    }
    )
})
storageBd.post("/bodegas/add", (req, res) => {
   let datos=req.body;
   // const id=datos.id;
    con.query(/*sql*/`INSERT INTO bodegas (datos.id, datos.nombre, datos.id_responsable, datos.estado, datos.created_by, datos.update_by, datos.created_at, datos.updated_at, datos.deleted_at)`,
    (err,data,fil)=>{
        res.send(JSON.stringify(datos));
        console.log(datos);
        res.end(JSON.stringify(data));
    }
    )
})

export default storageBd;

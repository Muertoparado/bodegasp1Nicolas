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
       // res.end(JSON.stringify(data));
    }
    )
})
//(id,nombre,id_responsable,estado, created_by, update_by, created_at, updated_at,deleted_at)
storageBd.post("/bodegas/add", (req, res) => {
   let datos=Object.values(req.body);
   console.log(datos);
    con.query(/*sql*/`INSERT INTO bodegas (nombre, id_responsable, estado, created_by, update_by) 
    VALUES (?, ?, ?, ?, ?)`,datos,
    (err,data)=>{
        if (err) {
            console.error("Error al ejecutar la consulta de inserción: ", err);
            res.status(500).send("Error al ejecutar la consulta de inserción");
            return;
          } 
       // let info=JSON.stringify(data)
        console.log(info);
        res.send("Datos registrados correctamente en la base de datos");
      //  res.send(info); 
    });
})/* 
storageBd.post('/bodegas1', (req, res) => {
    const { nombre, id_responsable, estado, created_by } = req.body;
    const query = 'INSERT INTO bodegas (nombre, id_responsable, estado, created_by) VALUES (?, ?, ?, ?)';
    con.query(query, [nombre, id_responsable, estado, created_by], (error, results) => {
      if (error) {
        return error;
      }
      res.status(201).send(`Bodega creada con ID: ${results.insertId}`);
    });
  }); */

export default storageBd;

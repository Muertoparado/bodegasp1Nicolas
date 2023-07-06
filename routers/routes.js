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

storageBd.post("/bodegas/add", (req, res) => {
    const { id,nombre, id_responsable, estado, created_by } = req.body;
    let datos= { id, nombre, id_responsable, estado, created_by }
    console.log(datos);
    con.query(`INSERT INTO bodegas SET ?`,datos,
    (err,data)=>{
        if (err) {
            console.error("Error al ejecutar la consulta de inserción: ", err);
            res.status(500).send("Error al ejecutar la consulta de inserción");
            return;
        } 
       // let info=JSON.stringify(data)
        //console.log(info);
        res.send("Datos registrados correctamente en la base de datos");
      //  res.send(info); 
    });
})
storageBd.get('/productos', (req, res) => {
    con.query(/*sql */
        `SELECT id_producto, SUM(cantidad) AS total_cantidad 
        FROM inventarios 
        GROUP BY id_producto 
        ORDER BY total_cantidad DESC`,
    (err, data) => {
        if (err) {
        console.error(err);
        res.send("Error en la consulta");
        return;
        }
        let info =JSON.stringify(data)
        res.send(info);
        console.log(data);
    }
    );
  });
storageBd.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    con.query(/*sql */
        `SELECT id_producto, SUM(cantidad) AS total_cantidad 
        FROM inventarios 
        WHERE id = ? 
        GROUP BY id_producto 
        ORDER BY total_cantidad DESC`,
    [id],
    (err, data) => {
        if (err) {
        console.error(err);
        res.send("Error en la consulta");
        return;
        }
        res.send("Consulta exitosa");
        console.log(JSON.stringify(data));
    }
    );
});

export default storageBd;

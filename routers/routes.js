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

/* storageBd.post('/productos', (req, res) => {
    let x =`INSERT INTO productos SET ?`;
    let y =`INSERT INTO inventarios SET ?`;
    const { id,nombre,descripcion,created_by,id_bodega,cantidad} = req.body;
    let datop= { id,nombre,descripcion,created_by};
    let datoi={id_bodega,cantidad};
    console.log(datop);
    console.log(datoi);
    if(datoi.id_bodega == null && datoi.cantidad == null){
        con.query(x,datop,y,[1,1],
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
)}
if(datoi.id_bodega == null){

}
}); */

storageBd.post('/inventarios/add', (req, res) => {
    const {id_producto, id_bodega, cantidad } = req.body;
    // Primero, verificar si el registro ya existe
    con.query(
      'SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ?',
        [id_producto, id_bodega],
        (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error en la consulta');
            return;
        }

        if (result.length > 0) {
          // Si el registro ya existe, hacer un UPDATE
        con.query(
            'UPDATE inventarios SET cantidad = cantidad + ? WHERE id_producto = ? AND id_bodega = ?',
            [cantidad, id_producto, id_bodega],
            (err, result) => {
                if (err) {
                console.error(err);
                res.status(500).send('Error en la actualización');
                return;
                }
            res.send('Registro actualizado exitosamente',result);
            }
        );
        } else {
          // Si el registro no existe, hacer un INSERT
        con.query(
            'INSERT INTO inventarios (id_producto, id_bodega, cantidad) VALUES (?, ?, ?)',
            [id_producto, id_bodega, cantidad],
            (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error en la inserción');
                return;
            }
            res.send('Registro insertado exitosamente');
            }
        );
        }
    }
    );
});

export default storageBd;

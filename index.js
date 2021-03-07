const express = require ('express');
const mysql = require ('mysql');
const bodyParser = require ('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();
app.use(express.json())

//MySQL parámeters
const connection = mysql.createConnection({
    host:'eu-cdbr-west-03.cleardb.net',
    user:'b88312b8ff21b3',
    password:'a14802dd',
    database:'heroku_b47455e2e03cf10?reconnect=true'
});

//Checking MySQL connection
connection.connect( err => {
    if(err) throw err;
    console.log('CONECTADO');
});

app.listen(PORT, () => {
    console.log(`SERVIDOR EJECUTÁNDOSE EN EL PUERTO ${PORT}`)
})


//Routes

//Obtener todos los clientes
app.get('/', (req,res) => {
    const sql = 'SELECT * FROM clientes';
    connection.query(sql, (err,results) => {
        if(err) throw err;
        if(results.length > 0 ){
            res.json(results)
        }
        else{
            res.send('No hay resultados')
        }
    })
})

///Obtener un cliente por su is
app.get('/cliente/:id', (req,res)=>{
    const {id } = req.params
    const sql = `SELECT * FROM clientes WHERE id = ${id}`
    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length > 0 ){
            res.json(result)
        }
        else{
            res.send('No hay resultados')
        }
    })
})

//Guardar clientes
app.post('/add', (req,res)=>{
    const sql = 'INSERT INTO clientes SET ?'

    const datosClientes = {
        nombre:req.body.nombre,
        apellidos:req.body.apellidos,
        email:req.body.email
    }

    connection.query(sql,datosClientes, err => {
        if(err) throw err
        res.send('CLIENTE CREADO')
    })
})

//Actualizar clientes
app.put('/update/:id', (req,res)=>{
    const {id } = req.params
    const { nombre, apellidos, email} = req.body 
    const sql = `UPDATE clientes SET nombre = '${nombre}', apellidos = '${apellidos}', email = '${email}' WHERE id = ${id}`

    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length > 0 ){
            res.json(result)
        }
        else{
            res.send('Cliente actualizado')
        }
    })
})

//Eliminar clientes
app.delete('/delete/:id', (req,res)=>{
    const {id } = req.params
    const sql = `DELETE FROM clientes WHERE id = ${id}`

    connection.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length > 0 ){
            res.json(result)
        }
        else{
            res.send('Cliente eliminado')
        }
    })
})




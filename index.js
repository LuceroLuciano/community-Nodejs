//proyecto con node.js
//creacion del servidor
const express = require('express');    
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const enrutador = require('./routes.js/routes');
const db = require('./models/index.js')
//const { route } = require('./routes.js/routes');

// inicializa express
const app = express();

db.sequelize.sync();

//Para eliminar las tablas o vaciarlas y aplicar nuevos cambios
/*  db.sequelize.sync({force:true}).then(()=>{
    console.log("Tabas restablecidad");
});  */


//middlewares -routes -static files y -start server

app.use(morgan('dev'));

app.use(express.json({limit:'50mb'}));

//routes
app.use("/api/clase", enrutador);

//static files
app.use("/api", enrutador);
app.use('/public',express.static(__dirname + '/public'));


//app.get('/',(req, res)=>{
//    res.json({message:'Bienvenido a nuestro servidor'})
//});


//satart server
//ports mas comunes
// 5050, 3000, 8080
app.listen(8080, ()=>{
    console.log('servidor esta corriendo en el puerto', 8080);
})


//post, get, put, delete <- metodos de http

//ctrl + shif + A  -> para documentar un bloque do código
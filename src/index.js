const express = require('express');
const mongoose = require('mongoose');
const dbConnect = require('./db.connect.js');
const cors = require('cors')

// Importar rutas
const routes = require('./routes/user.routes.js');

// Ejecucion de express
const app = express();

// Middleware
app.use(express.json());
app.use(routes);

const corsOptions ={
    origin:'http://127.0.0.1:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// config puerto
const port = 3000;
dbConnect();
app.listen(port, console.log("Running on port 3000"));
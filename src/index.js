const express = require('express');
const mongoose = require('mongoose');
const dbConnect = require('./db.connect.js');

// Importar rutas
const routes = require('./routes/user.routes.js');

// Ejecucion de express
const app = express();

// Middleware
app.use(express.json());
app.use(routes);


// config puerto
const port = 3000;
dbConnect();
app.listen(port, console.log("Running on port 3000"));
const mongoose = require('mongoose');

// Creamos el esquema de los datos a registrar
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    addres: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Exportamos el modelo de datos
module.exports = mongoose.model('User', userSchema);
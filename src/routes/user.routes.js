const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validatorSchema = require('../schemas/validate.schema');
const { registerValidator, loginValidator } = require('../schemas/auth.schema');
const User = require('../models/user.schema');
const verifyToken = require('../jwt/verifyToken');
const route = express.Router();


const TOKEN = 'secretNewToken';

const accessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN, {
            expiresIn: '1d',
        },
        (err, token) => {
            if(err) reject(err)
            resolve(token)
        })
    })
}

// Configuracion de enviar correo de confirmacion
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'servi.tools22@gmail.com',
        pass: 'izmthaseotcktbwc'
    }
});

// Inicio
route.get('/', (req, res) =>{
    res.send('Welcome to EventsBrew')
}) 

// Registro 
route.post('/register', validatorSchema(registerValidator), async (req, res) => {
    const { name, email, phone, addres, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        phone,
        addres,
        password: passwordHash,
    });

    const saveUser = await newUser.save();

    transporter.sendMail({
        from: 'servi.tools22@gmail.com',
        to: `${email}`,
        subject: 'Confirmación de correo',
        html: '<h1>Gracias por registrarte! UwU</h1> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL14vd2g6r-QSkK6NRJ9Rdc2svG3auTMQuORMe9SxkCJf2xJRsSCPaVOZAnsYVCSny7VY&usqp=CAU">'
    }).then((res) => { console.log(res); }).catch((err) => { console.log(err); });

    const token = await accessToken({id: saveUser._id});
    res.cookie('token', token);
    jwt.sign({ users: newUser }, TOKEN, (err, token) => {
        if(err) {
            res.sendStatus(402);
        }else{
            res.json({ token: token });
        }
    })
});

// Inicio de sesion 
route.post('/login', validatorSchema(loginValidator), verifyToken, async (req, res) => {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if(!userFound) return res.status(400).json({ message: 'Email not found' })

    const correctPassword = await bcrypt.compare(password, userFound.password);
    if(!correctPassword) return res.status(400).json({ message: 'Password or email incorrect' });

    const token = await accessToken({id: userFound._id});
    res.cookie('token', token);

    jwt.verify(req.token, TOKEN, (error, authData) => {
        if(error) {
            res.sendStatus(403);
        }else{
            res.json({ authData: authData });
        }
    })
});

// Exportar route
module.exports = route; 
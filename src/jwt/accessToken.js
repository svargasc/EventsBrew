const jwt = require('jsonwebtoken');
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

module.exports = accessToken, TOKEN;
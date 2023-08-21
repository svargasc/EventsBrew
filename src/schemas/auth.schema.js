const zod = require('zod');

// Validacion registro
const registerValidator = zod.object({
    name: zod.string({
        required_error: 'Full this input',
    }),
    email: zod.string({
        required_error: "Full this input",
        message: "Inavlid email",
    }),
    phone: zod.string({
        required_error: "Full this input",
    }),
    addres: zod.string({
        required_error: "Full this input"
    }),
    password: zod.string({
        required_error: "Full this input",
    }).min(8, {
        message: "Password must be a leat 8 characters",
    }),
});

// Validacion login
const loginValidator = zod.object({
    email: zod.string({
        required_error: "Email is required",
        message: "Invalid email",
    }),
    password: zod.string({
        required_error: "Email invalid or password invalid",
    })
})

module.exports = { registerValidator, loginValidator };
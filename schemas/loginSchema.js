const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    // firstName: {type: String, required: true},
    // lastName: {type: String, required: true},
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    completed: {type: Boolean, default: false, required: true}
})

const loginModel = mongoose.model('login', loginSchema)

module.exports = loginModel
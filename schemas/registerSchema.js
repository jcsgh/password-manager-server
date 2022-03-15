const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    completed: {type: Boolean, default: false, required: true}
})

const registerModel = mongoose.model('register', registerSchema)

module.exports = registerModel
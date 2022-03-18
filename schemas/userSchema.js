const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    completed: {type: Boolean, default: false, required: true},
    // passwords: [{type: mongoose.Schema.Types.ObjectId, ref: 'Password'}]
})

// userSchema.pre('save', functions(next)={

// })

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
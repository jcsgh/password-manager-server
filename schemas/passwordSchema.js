const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    title: {type: String, required: true},
    password: {type: String, required: true},
    created_at: {type: Date, required: true},
    completed: {type: Boolean, default: false, required: true}
})

const passwordModel = mongoose.model('passwords', passwordSchema)

module.exports = passwordModel
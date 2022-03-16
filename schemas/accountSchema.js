const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    },
    site: { 
        type: String, required: true 
    },
    password: { 
        type: String, required: true 
    },
    username: { 
        type: String, required: true 
    },
    completed: { 
        type: Boolean, 
        default: false, 
        required: true 
    }
})

const accountModel = mongoose.model('account', accountSchema)

module.exports = accountModel
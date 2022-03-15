const mongoose = require("mongoose")

async function mongooseConnect(){
    await mongoose.connect(process.env.MONGODB_URI)
}

module.exports = mongooseConnect
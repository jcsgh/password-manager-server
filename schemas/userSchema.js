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

// userSchema.pre('save', function(next){
//     if(!this.isModified('password'))
//         return next();
//     bcrypt.hash(this.password,12,(err, passwordHash)=>{
//         if(err)
//             return next(err)
//         this.password = passwordHash;
//         next();
//     })
// })

// userSchema.methods.comparePassword = function(password,cb){
//     bcrypt.compare(password,this.password,(err,isMatch)=>{
//         if(err)
//             return cb(err);
//         else{
//             if(!isMatch)
//                 return cb(null,isMatch);
//             return cb(null,this);
//         }
//     });
// }

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
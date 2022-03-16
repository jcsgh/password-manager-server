const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJWT = require('../middleware/jwt')
const checkPrivate = require('../middleware/checkPrivate')
const User = require('../schemas/userSchema')
const Account = require('../schemas/accountSchema')

// Create the Router
const accountRouter = express.Router()

// Create the Routes
accountRouter.get("/", (req, res)=>{
    Account.find((error, result)=>{
        if(error){
            res.status(500).json({message: error.message})
        }
        if(result ===  null || result === []){
            res.status(404).json({message: error.message})
        }
        res.status(200).json({message: "YEAH"})
    })
})

// - CREATE*!
accountRouter.post('/:username/createPassword', verifyJWT, (req, res)=>{
    let { password, site, user, username } = req.body
    
    // - CREATE*! create a password for specified username
    let account = {
        user,
        password,
        site,
        username
    }

    Account.create(account, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === undefined || result === null){
            res.status(400).json({message: "Please enter all required values for password"})
        }
        res.status(200).json({account: result})
    })

})

//- READ*!
accountRouter.get('/:username/readPassword', verifyJWT, (req, res)=>{
    
    let password = req.params.username

    // get password title and password content and display

    Account.findOne({password: password}, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        res.status(200).json({password: result})
    })

})

 // - UPDATE*!
 accountRouter.put('/:id/updatePassword/:password', verifyJWT, (req, res)=>{
    
    let pwdId = req.params.id
    let password = req.params.password

    Account.findByIdAndUpdate(pwdId, {"password": password}, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === undefined || result === null){
            res.status(400).json({message: "Please enter valid id"})
        }

        res.status(200).json({message: "Password updated"})
    })

})

// - DELETE*!
accountRouter.delete('/:id/deletePassword', verifyJWT, (req, res)=>{

    let password = req.params.id

    Account.findByIdAndRemove(password, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === undefined || result === null){
            res.status(400).json({message: "Please enter valid id"})
        }
        res.status(200).json({message: "Password deleted"})
    })
})

accountRouter.get('/', checkPrivate, (req, res)=>{
    // display all non private passwords
    Account.find((error, result)=>{
        if(error){
            res.status(404).json({message: error.message})
        }
        if(result === null || result === undefined || result === []){
            res.status(404).json({message: "NOT FOUND"})
        }
        res.status(200).json({password: result})
    })
})

module.exports = accountRouter
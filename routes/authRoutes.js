const express = require('express')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const verifyJWT = require('../middleware/jwt')


const register = require('../schemas/registerSchema')
// const login = require('../schemas/loginSchema')

// Create the Router
const authRouter = express.Router()

authRouter.get("/", (req, res) => {
    res.status(200).json({message: "Auth routes up"})
})

authRouter.post("/register", async(req, res)=>{
    let user = req.body
    let password = user.password
    let salt = Number(process.env.SALT)
    user.created_at = Date.now()
    user.completed = false

    //TODO Make DataValidation Middleware LATER
    if (!user.firstName || !user.lastName || !user.userName || !user.email || !user.password){
        res.status(400).json({message: "Please enter a firstName, lastName, userName, email, and password"})
    }

    // TODO Make helper
    let hashedPassword = await bcrypt.hash(password, salt)
    user.password = hashedPassword
    
    register.create(user, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result ===  null || result === []){
            res.status(400).json({message: error.message})
        }
        res.status(201).json({user: result})
    })
})

module.exports = authRouter

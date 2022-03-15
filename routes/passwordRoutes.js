const express = require('express')
const register = require('../schemas/registerSchema')
const login = require('../schemas/loginSchema')

// Create the Router
const passwordRouter = express.Router()

// Create the Routes
passwordRouter.get("/users", (req, res)=>{
    login.find((error, result)=>{
        if(error){
            res.status(500).json({message: error.message})
        }
        if(result ===  null || result === []){
            res.status(404).json({message: error.message})
        }
        res.status(200).json({message: "YEAH"})
    })
})


module.exports = passwordRouter
const express = require('express')
const User = require('../schemas/userSchema')

// Create the Router
const passwordRouter = express.Router()

// Create the Routes
passwordRouter.get("/", (req, res)=>{
    User.find((error, result)=>{
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
const express = require('express')
const register = require('../schemas/registerSchema')
const login = require('../schemas/loginSchema')

// Create the Router
const authRouter = express.Router()

authRouter.get("/", (req, res) => {
    res.status(200).json({message: "Auth routes up"})
})

module.exports = authRouter

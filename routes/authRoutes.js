const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJWT = require('../middleware/jwt')

const User = require('../schemas/userSchema')

// Create the Router
const authRouter = express.Router()

authRouter.post("/register", async(req, res)=>{
    let user = req.body
    let password = user.password
    let salt = Number(process.env.SALT)
    user.created_at = Date.now()
    user.completed = false

    //TODO Make DataValidation Middleware LATER
    if (!user.firstname || !user.lastname || !user.username || !user.email || !user.password){
        res.status(400).json({message: "Please enter a firstname, lastname, username, email, and password"})
    }

    // TODO Make helper
    let hashedPassword = await bcrypt.hash(password, salt)
    user.password = hashedPassword
    
    User.create(user, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result ===  null || result === []){
            res.status(400).json({message: error.message})
        }
        res.status(201).json({user: result})
    })
})

authRouter.post('/login', (req, res)=>{
    let username = req.body.username
    let password = req.body.password

    //TODO Make DataValidation Middleware LATER
    if (!password || !username){
        return res.status(400).json({message: "Please enter a username AND password"})
    }

    User.findOne({username: username}, (error, result)=>{
        if(error){
            return res.status(400).json({message: error.message})
        }
        if(result === null || result === undefined){
            return res.status(404).json({message: "User Not Found"})
        }
        bcrypt.compare(password, result.password, (error, matching)=>{
            if(error){
               return res.status(403).json({message: error.message})
            }
            if(matching === false){
               return res.status(403).json({message: "Either username or password is incorrect"})
            }
            let token = jwt.sign(username, process.env.JWT_SECRET)
            res.setHeader('Authorization', token)
            res.status(200).json({user: result})
        })
    })
})

// gets user by username
authRouter.get('/getUsername/:username', verifyJWT, (req, res)=>{
    let user = req.params.username
    User.findOne({user: user}, (error, result)=>{
        if(error){
            res.status(404).json({message: error.message})
        }
        if(result === null || result === undefined || result === []){
            res.status(404).json({message: "NOT FOUND"})
        }
        res.status(200).json({user: result})
    })
})

// gets all users
authRouter.get('/', verifyJWT, (req, res)=>{
    User.find((error, result)=>{
        if(error){
            res.status(404).json({message: error.message})
        }
        if(result === null || result === undefined || result === []){
            res.status(404).json({message: "NOT FOUND"})
        }
        res.status(200).json({users: result})
    })
})


module.exports = authRouter

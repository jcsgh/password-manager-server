const express = require('express')
const login = require('../schemas/loginSchema')

// Create the Router
const passwordRouter = express.Router()

// Create the Routes
passwordRouter.get("/", (req, res)=>{
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

// passwordRouter.post("/", (req, res)=>{
//     const todo = req.body
//     todo.created_at = Date.now()
//     todo.completed = false
//     ToDo.create(todo, (error, result)=>{
//         if(error){
//             res.status(400).json({message: error.message})
//         }
//         if(result ===  null || result === []){
//             res.status(400).json({message: error.message})
//         }
//         res.status(201).json({todo_item: result})
//     })
// })

module.exports = passwordRouter
const express = require('express')
const Password = require('../schemas/passwordSchema')

// Create the Router
const passwordRouter = express.Router()

// Create the Routes
passwordRouter.get("/", (req, res)=>{
    Password.find((error, result)=>{
        if(error){
            res.status(500).json({message: error.message})
        }
        if(result ===  null || result === []){
            res.status(404).json({message: error.message})
        }
        res.status(200).json({password_list: result})
    })
})

passwordRouter.post("/", (req, res)=>{
    const password = req.body
    console.log('here', password)
    password.created_at = Date.now()
    password.completed = false
    Password.create(password, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result ===  null || result === []){
            res.status(400).json({message: error.message})
        }
        res.status(201).json({password_item: result})
    })
})

passwordRouter.get("/:id", (req, res)=>{
    const id = req.params.id
    Password.findById(id, (error, result)=>{
        if(error){
            res.status(500).json({message: error.message})
        }
        if(result ===  null || result === []){
            res.status(404).json({message: error.message})
        }
        res.status(200).json({password: result})
    })
})

passwordRouter.put("/:id", (req, res)=>{
    const id = req.params.id
    const update = req.body

    Password.findByIdAndUpdate(id, update, {new: true}, (error, result)=>{
        if(error){
            res.status(500).json({message: error.message})
        }
        if(result ===  null || result === []){
            res.status(404).json({message: error.message})
        }
        res.status(202).json({password_item: result})
    })
})
passwordRouter.delete("/:id", (req, res)=>{
    const id = req.params.id
    Password.findByIdAndDelete(id, (error, result)=>{
        if(error){
            res.status(404).json({message: error.message})
        }
        res.status(204).json({status: "deleted"})
    })
})

module.exports = passwordRouter
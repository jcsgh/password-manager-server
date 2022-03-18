// *** DEPENDENCIES ***

// express makes designing and building web applications 
// quick and easy.
const express = require('express')

// bodyParser responsible for parsing the incoming request 
// bodies in a middleware before you handle it.
const bodyParser = require('body-parser')

// dotenv allows us to separate secrets from our source code. 
const dotenv = require('dotenv')

// morgan is a Node. js and Express middleware to log HTTP 
// requests and errors, and simplifies the process.
const morgan = require('morgan')

// Cross-origin Rescource Sharing (CORS) allows us to make
// requests from one website to another in the browser
// usually prohibited by another browser policy called the
// Same-Origin Policy (SOP).
const cors = require('cors')

// Mongoose
const mongooseConnect = require('./mongoConfig')

// cookie parser
const cookieParser = require('cookie-parser')

// initialize routes
const accountRouter = require('./routes/accountsRoutes')
const authRouter = require('./routes/authRoutes')

// STEP ONE - Create the App
const app = express()
// STEP TWO - Configure the App
dotenv.config()

// MIDDLE WARES!!!
app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())

// ROUTES
app.use('/passwordManager', accountRouter)
app.use('/auth', authRouter)

// CREATE THE PORT
const PORT = process.env.PORT || 5000

// CREATE BASE ROUTE
app.use('/', (req, res)=>{
    res.status(200).json({message: "API CHANGED!"})
})

// LISTEN
app.listen(PORT, ()=>{
    console.log(PORT)
    mongooseConnect()
})
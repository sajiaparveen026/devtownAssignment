require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connection = require('./db');
const userRouter = require("./routes/userRouter")
const noteRouter =require("./routes/noteRouter")

const app = express()
app.use(cors())
app.use(express.json())

//Routes
app.use('/users',userRouter)
app.use('/api/notes',noteRouter)

//Database Connection
connection();

// Listen Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
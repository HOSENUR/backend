const express = require('express')
const auth = require('./routes/auth')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
mongoose.connect('mongodb+srv://'+process.env.MONGOUSER+':'+process.env.MONGOPASSWORD+'@kraken.1bqex.mongodb.net/users?retryWrites=true&w=majority')
app.use(cors())
app.use(express.json())

app.use("/auth",auth)

app.listen(5000,()=>{
	console.log("Server Up")
})

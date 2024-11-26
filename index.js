//1 load .env file
require('dotenv').config()
//2 express import
const express=require('express')
//6 import cors
const cors=require('cors')
require('./DB/connection')
const router = require('./Router/router')
const applictionMiddleware = require('./Middlewares/applicationMiddleware')

//3 create an app using express
const pfServer=express()
//4 port creation
const PORT = 4000 || process.env.PORT

//7
pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(applictionMiddleware)
pfServer.use(router)
//image export to frontend
pfServer.use('/uploads',express.static('./uploads'))
//5 App
pfServer.listen((PORT),()=>{
    console.log('pfServer listening on the port '+PORT);
    
})
pfServer.get('/',(req,res)=>{
    res.send("Welcome to pfServer")
})

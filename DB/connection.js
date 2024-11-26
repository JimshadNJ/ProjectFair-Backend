//1 import mongoose
const mongoose = require('mongoose')

//2 connection code
const connection_string = process.env.connectionString

//3 define connection
mongoose.connect(connection_string).then(res=>{
    console.log(('pf server connected with mongodb'));
    
}).catch((err)=>{
    console.log("Error "+err);
    
})
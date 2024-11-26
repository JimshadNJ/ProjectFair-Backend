const jwt = require('jsonwebtoken')

//Logic for all API requests

//import model
const users = require('../Models/userSchema')

//1 Register logic
exports.register=async(req,res)=>{
    console.log('Inside the register function');
    const{username,email,password}=req.body
    console.log(username,email,password);
    
try{
    //check email is present in db
    const userDetails=await users.findOne({email})
    console.log(userDetails);
    //if it is existing
    if(userDetails){
        res.status(401).json("User already existing...")

    }else{
        const newUser=new users({
            username:username,
            email:email,
            password:password,
            github:"",
            linkedIn:"",
            profilePic:""
        })
        await newUser.save()//save to mongodb
        res.status(200).json(newUser)//send response to client side
    }

}
catch(error){
    console.log(error);
    
}
}
  
//2 Login logic
exports.login=async(req,res)=>{
    console.log("Inside login function");
    const{email,password}=req.body
try{
    const userData=await users.findOne({email,password})
    if(userData){
        //token generation
        const token = jwt.sign({userId:userData._id},process.env.jwtToken)
        res.status(200).json({user:userData,token})
    }else{
        res.status(401).json("Invalid email or password")
    }
} 
catch(error){
    res.status(406).json(error)
 }      
}
 


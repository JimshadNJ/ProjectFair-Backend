const applictionMiddleware = (req,res,next)=>{
    console.log("Inside Application Level Middleware");
    next()
}
module.exports=applictionMiddleware
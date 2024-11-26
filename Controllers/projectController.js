const projects=require('../Models/projectSchema')

//add project logic
exports.addProject=async(req,res)=>{
    const{title,language,github,link,description}=req.body
    const projectImg=req.file.filename
    const userId=req.payload

    try{
        const project=await projects.findOne({github})
        if (project){
            res.status(404).json("Project already existing...")
        }
        else{
            const newProject = new projects({title,language,github,link,description,projectImg,userId})
            await newProject.save()
            res.status(200).json(newProject)
        }

    }
    catch(err){
        resizeBy.status(402).json('Error '+err)
    }
}

//get all user projects
exports.getAllUserProject=async(req,res)=>{
    const searchKey = req.query.search

    const query ={
        title:{
            $regex:searchKey,
            $options:'i'
        }
    }
    try{
         const response=await projects.find(query)
         res.status(200).json(response)
    }
    catch(err){
        res.status(402).json("Error",err)
    }
}

//get a user project
exports.getUserProject=async(req,res)=>{
    const userId=req.payload
    try{
        const response=await projects.find({userId})
         res.status(200).json(response)

    }
    catch(err){
        res.status(403).json("Error",err)
    }
}

//get home project
exports.getHomeProject=async(req,res)=>{
    try{
         const response=await projects.find().limit(3)
         res.status(200).json(response)
    }
    catch(err){
        res.status(402).json("Error",err)
    }
}

//delete a project
exports.deleteAProject=async(req,res)=>{
    const {projectId}=req.params
    try{
        const response=await projects.findByIdAndDelete({_id:projectId})
        res.status(200).json('Deleted succesfully')
    }
    catch(err){
        res.status(402).json("Error",err)
    }
}

//edit project
exports.updateProject=async(req,res)=>{
    const{title,language,github,link,description,projectImg}=req.body
    const updateImg=req.file?req.file.filename :projectImg
    const userId=req.payload
    const {projectId}=req.params

    try{
        const updateProject = await projects.findByIdAndUpdate({_id:projectId},{title:title,language:language,github:github,link:link,description:description,projectImg:updateImg})
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch(err){
        res.status(402).json("Error",err)
    }
}

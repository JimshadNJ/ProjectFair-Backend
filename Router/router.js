//1 import express
const express = require('express')

//2 create router from express
const router = express.Router()

//4 import user controller
const userController = require('../Controllers/userController')
//import project controller
const projectController = require('../Controllers/projectController')

const jwtMiddleware=require('../Middlewares/jwtMiddleware')

const multerMiddleware=require('../Middlewares/multerMiddleware')

//3 create route for each requests

// 1 register request : http://localhost:4000/api/register
router.post('/api/register',userController.register)

//2 login request : http://localhost:4000/api/login
router.post('/api/login',userController.login)

//3 add project
router.post('/api/addProject',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProject)

//get all user projects
router.get('/api/getAllUserProject',jwtMiddleware,projectController.getAllUserProject)

//get a user project
router.get('/api/getUserProject',jwtMiddleware,projectController.getUserProject)

//get home project
router.get('/api/getHomeProject',projectController.getHomeProject)

//delete a project
router.delete('/api/deleteAProject/:projectId',jwtMiddleware,projectController.deleteAProject)

//update project
router.put('/api/updateProject/:projectId',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.updateProject)
module.exports=router
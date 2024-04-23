import express ,{Router}from 'express'
import userController from '../controllers/users.controller'
const userroutes: Router=express.Router()

userroutes.route('/users').get(userController.getUser)

export default userroutes
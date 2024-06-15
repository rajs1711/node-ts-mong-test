import express ,{Router}from 'express'
import {createUser} from '../controllers/users.controller'
const userroutes: Router=express.Router()

userroutes.route('/users').post(createUser)

export default userroutes
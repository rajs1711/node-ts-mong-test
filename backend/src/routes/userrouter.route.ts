import express ,{Router}from 'express'
import {getUser} from '../controllers/users.controller'
const userroutes: Router=express.Router()

userroutes.route('/users').get(getUser)

export default userroutes
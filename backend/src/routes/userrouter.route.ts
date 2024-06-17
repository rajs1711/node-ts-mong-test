import express ,{Router}from 'express'
import {createUser} from '../controllers/users.controller'
import { login } from '../controllers/users.controller'

const userroutes: Router=express.Router()

userroutes.route('/regoster').post(createUser)
userroutes.route('/login').post(login)

export default userroutes
import express ,{Router}from 'express'
import {createcateogry} from '../controllers/cateogry.controller'
import { authuser } from '../middlewares/authenticator'

const cateogryroutes: Router=express.Router()

cateogryroutes.route('/createcateogry').post(authuser,createcateogry)


export default cateogryroutes
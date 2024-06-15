import express,{Router} from 'express'
import userroutes from './userrouter.route'

const rootrouter=express.Router()
//user routes
rootrouter.use('/user',userroutes)

export default rootrouter
import express,{Router} from 'express'
import userroutes from './userrouter.route'
import cateogryroutes from './cateogry.route'
import productRoutes from './product.route'

const rootrouter=express.Router()
//user routes
rootrouter.use('/user',userroutes)
rootrouter.use('/cateogry',cateogryroutes)
rootrouter.use('/product',productRoutes)

export default rootrouter
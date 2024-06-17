import express ,{Router}from 'express'
import {createProduct} from '../controllers/product.controller'

const productRoutes=express.Router()

productRoutes.route('/createproduct').post(createProduct)

export  default productRoutes

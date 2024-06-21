import express ,{Router}from 'express'
import {createProduct} from '../controllers/product.controller'
import { authuser } from '../middlewares/authenticator'
import { upload } from '../middlewares/multerMiddleware'
const productRoutes=express.Router()

productRoutes.route('/createproduct').post(authuser,upload.fields([
    {
        name: "productImage",
        maxCount: 1
    }, 
    {
        name: "productImageGallery",
        maxCount: 5
    }
]),createProduct)

export  default productRoutes

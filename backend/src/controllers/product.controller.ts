import {Request,Response,NextFunction} from 'express'
import { asynchandler } from '../utils/asynchandler'
import { Product } from '../models/product.model'
import { HTTPException } from '../exceptions/rootException'
import vine from '@vinejs/vine';
import { productcreation_schema } from '../utils/validators/productvalidator'
import { uploadCloudinary } from '../utils/cloudinary'
import fs from 'fs'
import { UploadApiResponse } from 'cloudinary';

// have to expicitly update Request to handle files in typescript
// Extend the Express Request interface to include file and files properties
// Extend Express Request interface

declare global {
    namespace Express {
        interface Request {
            files?: {
                productImage?: Express.Multer.File[];
                productImageGallery?: Express.Multer.File[];
            };
        }
    }
}
//define files type
interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  }




export const createProduct=asynchandler(async(req:Request ,res:Response,next:NextFunction)=>{
    
    if(req.body && Object.keys(req.body).length == 0){
        throw new HTTPException('Invalid Request ,Request Body Empty',400,'400',null);
      }
    const validator = vine.compile(productcreation_schema)
    await validator.validate(req.body)

    const {name,slug,isActive,price,rating,countInStock,cateogryid}=req.body
    const reviewsids=req.body.reviewids

     // Access the file paths
     const productImage=req.files?.productImage as Express.Multer.File[] | undefined
     const productImageGallery=req.files?.productImageGallery as Express.Multer.File[] | undefined

     let prod_image_path:string
     let prod_image_path_gallery:string[]=[]

     if(productImage && productImage.length >0){
        prod_image_path=productImage[0].path
     }else{
        throw new HTTPException('Please Provide ProductCover Image',400,'400',null)
     }

    if(productImageGallery && productImageGallery.length > 0){
      productImageGallery.map((image:UploadedFile)=>{
        prod_image_path_gallery.push(image.path)
        })
    }

     // call cloudinary to upload file 
     const prod_galley_path_cloudinary:string[]=[]
     const image_result=await uploadCloudinary(prod_image_path)
     if(image_result){
        //fs.unlinkSync(prod_image_path)
        if(prod_image_path_gallery && prod_image_path_gallery.length >0){
                for (const temp_img_path of prod_image_path_gallery) {
                const prod_galley_image_result=await uploadCloudinary(temp_img_path)
                if(prod_galley_image_result){
                   // fs.unlinkSync(temp_img_path)
                    prod_galley_path_cloudinary.push(prod_galley_image_result.url)
                }else{
                fs.unlinkSync(temp_img_path)
                }
            }
        }
     }else{
        fs.unlinkSync(prod_image_path)
        if(prod_image_path_gallery && prod_image_path_gallery.length >0){
            prod_image_path_gallery.forEach((temp_img_path)=>{
                fs.unlinkSync(temp_img_path)
            })
        }
        throw new HTTPException('Product not saved , error in product cover image upload',400,'400',null)
     }
     //end upload file //

     //clean localfiles
     prod_image_path_gallery.push(prod_image_path)
     prod_image_path_gallery.forEach(element => {
        fs.unlinkSync(element)
     });

       // DB call 
    if(image_result.url){
    const result= await Product.create({
        name,
        slug,
        isActive,
        price,
        rating,
        countInStock,
        reviewsids,
        cateogry:cateogryid,
        productImage:image_result.url,
        productImageGallery:prod_galley_path_cloudinary,
    })

    if(result){
       return res.status(200).json({"msg":"Product Created Successfully",data:result})
    }else{
        throw new HTTPException('Invalid data',400,'400',null)
    }
}else{
    throw new HTTPException('Please Upload product Image',400,'400',null)
}

})
import {Request,Response,NextFunction} from 'express'
import { v2 as cloudinary } from 'cloudinary';
import { asynchandler } from '../utils/asynchandler'
import fs from 'fs'
import { HTTPException } from '../exceptions/rootException';



export const uploadCloudinary= async(localFilePath:string)=>{
   try{
    if(!localFilePath) return null
    
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
        api_key:  process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    // Upload an image
     const uploadResult = await cloudinary.uploader.upload( localFilePath, {
            resource_type: "auto",
           }
       )
       //fs.unlinkSync(localFilePath)
       return uploadResult;
    }catch(error){
        console.log(error)
       // fs.unlinkSync(localFilePath)
        console.log(localFilePath)
        console.log(process.env.CLOUDINARY_CLOUDNAME)
        console.log(process.env.CLOUDINARY_API_KEY)
        console.log(process.env.CLOUDINARY_API_SECRET)
        throw new HTTPException('Something Went Wronggg',400,'400',null)
    }
    

}

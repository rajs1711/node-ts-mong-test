import {Request,Response,NextFunction} from 'express'
import { asynchandler } from '../utils/asynchandler'
import { HTTPException } from '../exceptions/rootException';
import { Cateogry } from '../models/cateogries.model';
import vine from '@vinejs/vine';
import { cateogrycreation_schema } from '../utils/validators/cateogryvalidator';

interface cateogryData{
    name:string;
    slug:string;
    description:string;
    isActive:boolean;
}
export const createcateogry=asynchandler(async(req:Request,res:Response,next:NextFunction)=>{
    //validata data 
   if(req.body && Object.keys(req.body).length == 0){
     throw new HTTPException('Invalid Request ,Request Body Empty',400,'400',null);
   }

    const validator = vine.compile(cateogrycreation_schema)
    await validator.validate(req.body)

    const {name, slug,description,isActive}:cateogryData=req.body
    const result=await Cateogry.create({
      name,
      slug,
      description,
      isActive  
    })
    if(result){
       return res.status(200).json({"msg":"Cateogry created Successfully",data:result})
    }else{
        throw new HTTPException('Cateogry Not Created -ERROR -Please Try Again',400,'400',null);
    }
});
import {Request,Response,NextFunction} from 'express'
import { asynchandler } from '../utils/asynchandler'

export const createProduct=asynchandler(async(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({"msg":"success"})

})
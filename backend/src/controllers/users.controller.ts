import {Request , Response ,NextFunction} from 'express'
import { User } from '../models/user.model'
import {usercreation_schema} from '../utils/validators/userCreatevalidator'
import vine ,{errors} from '@vinejs/vine'
import { asynchandler } from '../utils/asynchandler'
import { HTTPException } from '../exceptions/rootException'

interface requestuserdata{
    email:string,
    mobile:string|null,
    password:string
}
export const createUser= asynchandler(async(req:Request,res:Response,next:NextFunction)=>{   
        if(!req.body){
            throw new HTTPException('Bad Request',404,'404',null)
        }
        const {email,mobile,password}:requestuserdata = req.body
    
        const validator = vine.compile(usercreation_schema)
        const output = await validator.validate(req.body)
        
        const existUser= await User.find({email:email})
     
        if(existUser.length > 0){
            throw new HTTPException('User already exists',404,'404',null)
        }
        const result =await User.create({
            username:email,
            email,
            mobile,
            password
        })
        
        if(result){
            return res.json({"success":200,"msg":'User Created successfully'})
        }else{
            throw new HTTPException('Bad Request',404,'404',null)
        }
})

import {Request , Response ,NextFunction} from 'express'
import { User } from '../models/user.model'
import {usercreation_schema} from '../utils/validators/userCreatevalidator'
import vine ,{errors} from '@vinejs/vine'

interface requestuserdata{
    email:string,
    mobile:string|null,
    password:string
}
export const createUser= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        if(!req.body){
            return res.json({"success":400,"msg":'Bad Request'})
        }
        const {email,mobile,password}:requestuserdata = req.body
    
        const validator = vine.compile(usercreation_schema)
        const output = await validator.validate(req.body)
        //console.log(output)
        if(!output.email){
            return res.json({"success":400,"msg":output})
        }
       
        const existUser= await User.find({email:email})
        //console.log(existUser)
        if(existUser.length > 0){
            console.log('snddjd')
            return res.json({"success":400,"msg":'User already exists'})
        }
        const result =await User.create({
            username:email,
            email,
            mobile,
            password
        })
        
        if(result){
            console.log(result)
            return res.json({"success":200,"msg":'User Created successfully'})
        }else{
            console.log(result)
            return res.json({"success":400,"msg":'Bad Request'})
        }

    }catch(error){
       
        if(error instanceof errors.E_VALIDATION_ERROR){
            return res.json({"success":400,"msg":error.messages})
        }
        
    }


}

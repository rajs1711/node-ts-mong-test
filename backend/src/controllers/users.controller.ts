import {Request , Response ,NextFunction} from 'express'
import { User } from '../models/user.model'
import {usercreation_schema} from '../utils/validators/userCreatevalidator'
import vine ,{errors} from '@vinejs/vine'
import { asynchandler } from '../utils/asynchandler'
import { HTTPException } from '../exceptions/rootException'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface requestuserdata{
    email:string,
    mobile:string|null,
    password:string
}
//registration
export const createUser= asynchandler(async(req:Request,res:Response,next:NextFunction)=>{   
        if(req.body && Object.keys(req.body).length == 0){
            throw new HTTPException('Invalid Request ,Request Body Empty',404,'404',null)
        }
        const {email,mobile,password}:requestuserdata = req.body
    
        const validator = vine.compile(usercreation_schema)
        const output = await validator.validate(req.body)
        
        const existUser= await User.find({email:email})
     
        if(existUser.length > 0){
            throw new HTTPException('User already exists',404,'404',null)
        }
        const pwd=await bcrypt.hash(password,10)
        const result =await User.create({
            username:email,
            email,
            mobile,
            password:pwd
        })
        
        if(result){
            return res.json({"success":200,"msg":'User Created successfully'})
        }else{
            throw new HTTPException('Bad Request',404,'404',null)
        }
})

//login

export const login=asynchandler(async(req:Request,res:Response,next:NextFunction)=>{
     if(req.body && Object.keys(req.body).length == 0){
        throw new HTTPException('Invalid Request ,Request Body Empty',400,'400',null)
     }
     const {email,password}=req.body
     const result=await User.find({email:email})
     if(result.length > 0){
            const userpwd:string=result[0].password
            const r=await bcrypt.compare(password,userpwd)
            const secret:any=process.env.SECRET
            if(r){
                const token:string=jwt.sign({
                    username:result[0].username,
                    email:result[0].email,
                },secret,{ expiresIn: '1h'})
                
                const data={
                  email:result[0].email,
                  token
                }
                return res.status(200).json({msg:"sucess",data})
            }else{
                throw new HTTPException('Passowrd Incorrect',400,'400',null)
            }
     }else{
        throw new HTTPException('Username Incorrect',400,'400',null)
     }
     
     
    res.status(200).json({"msg":result})
})

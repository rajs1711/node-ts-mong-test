import { Request,Response, NextFunction } from "express"
import vine ,{errors} from '@vinejs/vine'
import { HTTPException } from "../exceptions/rootException"
import { commonException } from "../exceptions/commonException"

export const asynchandler=(method:Function)=>{
      return async(req: Request,res: Response,next: NextFunction)=>{
          try{
               await method(req,res,next)
          }catch(error:any){
            let exception:HTTPException
            if(error instanceof errors.E_VALIDATION_ERROR){
                //console.log(error.messages)
                const myerror:any=[error.messages]
                 exception=new HTTPException(myerror,400,'400',null)
                
            }else if(error instanceof HTTPException){
               //console.log(error)
                 exception = error
            }else{
               //console.log(error)
               exception=new HTTPException('Something Went Wrong',500,'500',null)
            }
            next(exception)
              
          }
      }
}
import { Request,Response,NextFunction } from "express";
import { HTTPException } from "../exceptions/rootException";

export const errorMiddleware=(error:HTTPException,req:Request,res:Response,next:NextFunction)=>{
    res.status(error.errorCode).json({
        message:error.message,
        customError:error.customerrorcode,
        error:error.error
    })

}
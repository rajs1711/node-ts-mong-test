import {Request,Response,NextFunction} from 'express'
import { asynchandler } from '../utils/asynchandler'
import jwt from 'jsonwebtoken'
import { HTTPException } from '../exceptions/rootException';

interface JwtPayload {
    useusernamer: string;
    email: string;
    // Add any other payload properties here
}
// Extend the Express Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authuser=asynchandler(async(req:Request,res:Response,next:NextFunction)=>{
    
    if(req.headers.authorization){
        const token:any =req.headers.authorization.split(" ")[1]
        const secret:any=process.env.SECRET
        console.log(secret)
        const decodedToken  =await jwt.verify(token,secret) as JwtPayload
        req.user=decodedToken
        next()
        
    }else{
            throw new HTTPException('Invalid Request',400,'400',null)
    }
    
});

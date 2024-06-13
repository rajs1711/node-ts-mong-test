import {Request , Response} from 'express'
class userController{

     static getUser(req:Request,res:Response){
        
     return res.status(200).json({"msg":"success"})
    }
}

export default userController
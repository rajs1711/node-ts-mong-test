import {Request , Response} from 'express'

export const getUser= async(req:Request,res:Response)=>{

    res.json({"success":200,"msg":'Request successfully'})

}

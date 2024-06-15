import { HTTPException } from "./rootException";

export class commonException extends HTTPException{
       //message: string;
     
    constructor(message:string,errorcode:number){
        super(message,errorcode,'500',null)
        
    }
}
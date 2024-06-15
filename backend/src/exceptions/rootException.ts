export class HTTPException extends Error{
  
    message:any;
    errorCode:number;
    customerrorcode:string|null;
    error:any|null;

    constructor(message:any,errorcode:number,customerrorcode:string,error:any){
        super(message) 
        this.message=message,
        this.errorCode=errorcode,
        this.customerrorcode=customerrorcode,
        this.error=error
    }


}
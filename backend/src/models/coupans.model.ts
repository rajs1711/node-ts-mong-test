import mongoose,{Schema,Document} from "mongoose";

interface ICoupans extends Document{

    name:string;
    amount:number;
    createdAt?: Date;
    updatedAt?: Date;
}

const coupanSchema= new Schema({

    name:String,
    amount:{
        type:Number,
        required:true
    }

},{
    timestamps:true
})

const Coupans=mongoose.model<ICoupans>('coupan',coupanSchema)
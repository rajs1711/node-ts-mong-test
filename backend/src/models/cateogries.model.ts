import mongoose ,{ Schema,Document} from "mongoose";

interface ICateogry extends Document{
   name:string,
   slug:string
   description:string,
   isActive:boolean,
   createdAt?: Date;
   updatedAt?: Date;
}

const cateogrySchema:Schema= new Schema({
    
    name:{
        type:String,
        required:true
    },
    slug: {
        type: String
    },
    descritpion:String,
    isActive:{
       type:Boolean,
       default:true
    }
},
{
    timestamps:true
}
)

export const Cateogry=mongoose.model<ICateogry>('cateogry',cateogrySchema)
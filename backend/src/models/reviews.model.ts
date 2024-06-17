import mongoose,{Schema,Document} from "mongoose";

interface Ireviews extends Document{
   
    user: mongoose.Types.ObjectId;
    comment:string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ReviewSchema= new Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    comment:{
        type:String,
        required:true
    }

})

const Reviews=mongoose.model<Ireviews>('review',ReviewSchema)
import mongoose,{Schema,Document} from "mongoose";

// Define the interface for the product schema
export interface IProduct extends Document {
    name: string;
    slug: string;
    productImage: string;
    productImageGallery: string[];
    isActive: boolean;
    price: number;
    rating: number;
    countInStock: number;
    reviewids: mongoose.Types.ObjectId[];
    category: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const productSchema= new Schema({
  name:{
    type:String,
    required:true
  },
  slug:{
    type:String,
    required:true
  },
  productImage:{
    type:String,
    required:true,
    default:'https://image'
  },
  productImageGallery:[String],
  isActive:{
    type:Boolean,
    default:true
 },
 price:{
    type:Number,
    required:true
 },
 rating:{
    type:Number,
    required:true,
    default:3,
    min:1,
    max:5
 },
 countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
},
reviewids:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Reviews'
}  
],
  cateogry:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Cateogry',
    required:true
  }


},{
    timestamps:true
})

export const Product=mongoose.model<IProduct>('product',productSchema)
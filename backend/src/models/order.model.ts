import mongoose,{Schema,Document} from "mongoose";

// Define the interface for delivery address
interface IDeliveryAddress {
    customerName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    email: string;
    phone: string;
    notes?: string;
}
// Define the interface for the product schema
export interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    product: mongoose.Schema.Types.ObjectId[];
    totalprice: number;
    shippingMethod:string;
    shippingCost:number;
    coupans:mongoose.Schema.Types.ObjectId;
    finalprice:number;
    totalquanity:number;
    platform:string;
    paymentMode:'WEB' | 'APP';
    paymentMedium:'CASH'| 'DEBIT-CARD'|'CREDIT-CARD'|'UPI';
    paymentStatus:'PENDING'| 'INPROCESS'| 'CONFIRM';
    deliveryAddress:IDeliveryAddress[]
    orderStatus:String;
    createdAt?: Date;
    updatedAt?: Date;
}

const orderSchema= new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  product:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
  ],
  totalprice:{
    type:Number,
    required:true
  },
  shippingMethod: {
    type : String,
    default: "Post Mail Courier"
  },
  shippingCost: {
        type : Number,
        default: 0
    },
  coupans:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Coupans'
  },
 finalprice:{
    type:Number,
    required:true
 },
 totalquanity:{
    type:Number,
    required:true
 },
 platform:{
  type:String,
  required:true,
  enum:['WEB','APP'],
  deafult:'APP'
 },
 paymentMode:{
    type:String,
    enum: ['ONLINE', 'COD'], // Allowed values
 },
 paymentMedium:{
    type:String,
    enum: ['CASH', 'DEBIT-CARD','CREDIT-CARD','UPI'], // Allowed values
 },
 paymentStatus:{
    type:String,
    enum: ['PENDING', 'INPROCESS', 'CONFIRM'], // Allowed values
 },
 deliveryAddress:[{
    customerName: String,
    addressLine1 : String,
    addressLine2 : String,
    city : String,
    state : String,
    country : String,
    pincode : String,
    email : String,   
    phone : String,
    notes : String   
}],
orderStatus: {
    type : String,
    default: "PENDING"
}
},{
    timestamps:true
})

export const Orders=mongoose.model<IOrder>('order',orderSchema)
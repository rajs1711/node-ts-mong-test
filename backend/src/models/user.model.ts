import mongoose, {Schema ,Document} from "mongoose";

// Define the interface for items in cart and wishlist
interface IItem {
  productid: mongoose.Types.ObjectId;
  quantity: number;
}

// Define the User interface
interface IUser extends Document {
  username: string;
  email: string;
  mobile: string | null;
  password: string;
  isActive:Boolean;
  cart: IItem[];
  wishlist: IItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema:Schema = new Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  mobile:{
    type:String,
    default: null
  },
  password:{
    type:String,
    required:true
  },
  profileImage:{
    type:String,
    default:null
  },
  isActive:{
    type:Boolean,
    default:true
  },
  cart:[
    {
      productid:mongoose.Schema.Types.ObjectId,
      quanity:{
        type:Number,
        default:1
       }
    }
  ],
  wishlist:[
    {
      productid:mongoose.Schema.Types.ObjectId,
      quanity:{
        type:Number,
        default:1
       }
    }
  ]

},
{
    timestamps:true
})

export const User=mongoose.model<IUser>('User',userSchema)

import mongoose, {Schema ,Document} from "mongoose";
// Define the User interface
interface IUser extends Document {
  username: string;
  email: string;
  mobile: string | null;
  password: string;
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
    type:String
  }

},
{
    timestamps:true
})

export const User=mongoose.model<IUser>('User',userSchema)

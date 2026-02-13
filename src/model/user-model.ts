import { model, Schema } from "mongoose";
import { IUser } from "../types/user-type";
import jwt from 'jsonwebtoken'

const userSchema = new Schema<IUser>({
  name:{type:String,requried:true,trim:true},
   email:{type:String,requried:true,trim:true,unique:true},
    age:{type:Number,requried:true,trim:true},
     mobNo:{type:String,requried:true,trim:true,unique:true},
          password:{type:String,requried:true,trim:true},
})


// userSchema.pre("save",()=>{
//    const hashPassword = bcrypt.hash(this.password,10);
//    this.password = hashPassword;
// })

const User = model("User",userSchema);
export default User;
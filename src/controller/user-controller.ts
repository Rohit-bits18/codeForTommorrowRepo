import {  Request, Response } from "express";
import User from "../model/user-model";
import bcrypt from 'bcrypt'
import { IUser } from "../types/user-type";
import { requestHandler } from "../utils/requestHandler";
import jwt from 'jsonwebtoken'

const generateTokens = (email:string,_id:string)=>{
 const accessToken =  jwt.sign({
            email:email,
            userId:_id,
          },`${process.env.secretKey}`,{ expiresIn: '60s'});

          const refreshToken =  jwt.sign({
            email:email,
            userId:_id,
          },`${process.env.secretKey}`, {expiresIn: '7d'});

          return {accessToken,refreshToken}
}

export const registerController = requestHandler(async(req:Request,res:Response)=>{
          const {name, email, age, mobNo, password} = req.body as IUser;

          if(!name || !email|| !password|| !age|| !mobNo){
                    return res.status(400).json({message: "bad request",success:false});
          }

          const hashPassword =await bcrypt.hash(password,10);
          // addUser.password = hashPassword;
                
          const addUser = await User.create({
            name, email, age, mobNo,password:hashPassword
          })

          if(!addUser){
              return res.status(500).json({message: "interal server error",success:false});
          }

            return res.status(200).json({message: "user Create successfully",success:true,data:addUser});

})

export const loginController = requestHandler(async(req:Request,res:Response)=>{
          const {email, password} = req.body as IUser;

          if(!email|| !password){
                    return res.status(400).json({message: "bad request",success:false});
          }
                
          const isExist = await User.findOne({
           email:email
          })

          if(!isExist){
              return res.status(404).json({message: "user not found",success:false});
          }

          const comparePassword = await bcrypt.compare(password,isExist.password);

          if(!comparePassword){
            return res.status(404).json({message:"password is incorrect",success:false})
          }

          const {accessToken,refreshToken} = generateTokens(isExist.email,isExist._id);
          

          res.cookie("token",refreshToken);
            return res.status(200).json({message: "user login successfully",success:true,data:isExist})
})



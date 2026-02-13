import { NextFunction, Request, Response } from "express";

export const requestHandler = (handler:any)=>async(req:Request,res:Response,next:NextFunction) =>{
  try {
          await handler(req,res,next);
  } catch (error) {
    return res.status(500).json({message: error ?? "interal server error",success:false});
  }
}
import express, { Router } from "express";
import bcrypt from "bcrypt"
export const router = Router();
import z from "zod"
import { User } from "../db.js";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config.js";
import authMiddleware from "../authMiddleware.js";
const userBodyParser  = z.object({
    firstName : z.string().max(50),
    lastName : z.string().max(50),
    email: z.string().email().max(100),
    password : z.string().min(8).max(150)
})
const userBodyParserSignIn  = z.object({
    email: z.string().email().max(100),
    password : z.string().min(8).max(150)
})
function ZodValidationSiginIn(req, res, next){
    const body = req.body;
    const isOk = userBodyParserSignIn.safeParse(body)
    console.log("🚀 ~ bodyZodValidation ~ isOk:", isOk)
    if(!isOk.success){
        return res.status(411).json({message : "Enter valid details"})
    }else{
        next()
    }
}
function bodyZodValidation(req, res, next){
    const body = req.body;
    const isOk = userBodyParser.safeParse(body)
    if(!isOk.success){
        return res.status(411).json({message : "Enter valid details"})
    }else{
        next()
    }
}
async function hashPassword(password){
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🚀 ~ hashPassword ~ hashedPassword:", hashedPassword)
    return hashedPassword
}
router.post("/signup",bodyZodValidation, async (req , res)=>{
    try{
        const body = req.body;
        const isUserExist = await User.findOne({
            email : body.email
        })
        if(!isUserExist){
            const hashedPassword = await hashPassword(body.password);
            body.password = hashedPassword;
            const newUser =await User.create(body);
            const userId = newUser._id;
            console.log("🚀 ~ router.post ~ userId:", userId)
            const token = jwt.sign({userId} , JWT_SECRET)
            return res.status(200).json({
                message : "user created successfully",
                token
            })
        }else{
            return res.status(411).json({ message: "User already exists" });
        }
    }catch(err){
        return res.status(500).send(`Internal Server Error ${err}`)
    }
    
})

router.post("/signin",ZodValidationSiginIn, async (req, res)=>{
    const body = req.body;
    console.log("🚀 ~ router.post ~ body:", body)
    const isUserExist = await User.findOne({
        email : body.email,
    })
    console.log("🚀 ~ router.post ~ isUserExist:", isUserExist)
    if(isUserExist){
        const token = jwt.sign({
            userId : isUserExist._id
        },JWT_SECRET);
        console.log("🚀 ~ router.post ~ token:", token)
        return res.json({
            token
        })
    }else{
        return res.status(411).json({message : "User does not exist"})
    }
    
})
router.post("/check",authMiddleware)
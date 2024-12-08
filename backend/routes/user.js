import express, { Router } from "express";
import bcrypt from "bcrypt"
export const router = Router();
import z from "zod"
import { User } from "../db.js";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config.js";
import authMiddleware from "../authMiddleware.js";
import { salt } from "../config.js"; 
const signupBody  = z.object({
    firstName : z.string().max(50),
    lastName : z.string().max(50),
    email: z.string().email().max(100),
    password : z.string().min(8).max(150)
})
const signinBody  = z.object({
    email: z.string().email().max(100),
    password : z.string().min(8).max(150)
})
function signinValidation(req, res, next){
    const body = req.body;
    const isOk = signinBody.safeParse(body)
    console.log("🚀 ~ bodyZodValidation ~ isOk:", isOk)
    if(!isOk.success){
        return res.status(411).json({message : "Enter valid details"})
    }else{
        next()
    }
}
function signupValidation(req, res, next){
    const body = req.body;
    const isOk = signupBody.safeParse(body)
    if(!isOk.success){
        return res.status(411).json({message : "Enter valid details"})
    }else{
        next()
    }
}
const userUpdate = z.object({
    firstName : z.string().max(50).optional(),
    lastName : z.string().max(50).optional(),
    password : z.string().optional()
})
async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🚀 ~ hashPassword ~ hashedPassword:", hashedPassword)
    return hashedPassword
}
router.post("/signup",signupValidation, async (req , res)=>{
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

router.post("/signin",signinValidation, async (req, res)=>{
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
router.put("/",authMiddleware, async  (req, res)=>{
    const { success } = userUpdate.safeParse(req.body);
    if(!success){
        return res.json({meesage : "Enter valid details"})
    }
    if(req.body.password != null){
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword
    }
    const user = await User.updateOne({ _id : req.userId }, req.body)
    return res.json({message : "Updated successfully"})
})

router.get("/bulk/", authMiddleware, async (req, res)=>{
    const filter = req.query.filter || "";
    console.log("🚀 ~ router.get ~ filter:", filter)
    const results = await User.find({ $or: [ {firstName : { $regex : filter }}, { lastName : { $regex: filter }}] })
    return res.json({
        user: results.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
})
})


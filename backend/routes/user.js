import express, { Router } from "express";
import bcrypt from "bcrypt"
export const router = Router();
import z, { boolean } from "zod"
import { Account, User } from "../db.js";
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
    return hashedPassword
}
router.post("/signup",signupValidation, async (req , res)=>{
    try{
        const body = req.body;
        console.log(body)
        const isUserExist = await User.findOne({
            email : body.email
        })
        if(!isUserExist){
            const hashedPassword = await hashPassword(body.password);
            body.password = hashedPassword;
            const newUser =await User.create(body);
            const userId = newUser._id;
            const token = jwt.sign({userId} , JWT_SECRET)
            await Account.create({
                userId,
                balance : 1+ Math.random() * 10000
            })
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
    const isUserExist = await User.findOne({
        email : body.email,
    })
    if(isUserExist){
        const token = jwt.sign({
            userId : isUserExist._id
        },JWT_SECRET);
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
    const results = await User.find({ $or: [ {firstName : { $regex : filter }}, { lastName : { $regex: filter }}] })
    const filterUser = results.filter((user)=>(
        user._id.toString() !== req.userId.toString()
    )).map((user)=>({
        firstName : user.firstName,
        lastName : user.lastName,
        _id : user._id
    }))
    return res.json({
        users: filterUser
})
})

router.get("/dashboard", authMiddleware,async (req, res)=>{
    const id = req.userId;
    const { balance } = await Account.findOne({
        userId : id
    })
    const { firstName, lastName } = await User.findOne({
        _id : id 
    })
    console.log({
        balance,
        firstName,
        lastName
    })
    return res.json({
        balance,
        firstName,
        lastName
    })
})


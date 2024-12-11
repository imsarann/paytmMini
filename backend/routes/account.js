import express, { Router } from "express";
import authMiddleware from "../authMiddleware.js";
import { mongoose } from "mongoose";
import { Account } from "../db.js";
export const router = Router();


router.get("/balance",authMiddleware, async(req, res)=>{
    const user = await Account.findOne({
        userId : req.userId
    })
    return res.json({
        balance : user.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res)=>{
    const session = await mongoose.startSession();
    session.startTransaction()
    try{
            const {to, amount} = req.body;
            if (amount <= 0) {
                await session.abortTransaction();
                return res.status(400).json({ message: "Invalid amount" });
            }
            const fromUser = await Account.findOne({
                userId : req.userId
            }).session(session)
            if(!fromUser || fromUser.balance <  amount){
                session.abortTransaction();
                console.log("before insuffiecient")
                return res.status(400).json({
                    message : "Insufficient balance"
                })
            }
            const toAccount = await Account.findOne({userId : to}).session(session);
            if(!toAccount){
                await session.abortTransaction();
                return res.json({
                    message : "Invalid Account"
                })
            }
            await Account.updateOne({ userId : req.userId }, { balance : fromUser.balance - amount }, { session })
            await Account.updateOne({ userId : to}, { balance : toAccount.balance + amount }, { session })
            await session.commitTransaction();
            return res.json({
                message: "Transfer successful"
            });
    }catch (error) {
        await session.abortTransaction();
        console.error('Error processing transfer:', error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        session.endSession();
    }
});
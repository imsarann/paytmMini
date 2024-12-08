import { mongoose } from 'mongoose';
import { Schema } from 'mongoose';
import { MongoConnectionString } from "./config.js"
try{
    mongoose.connect(MongoConnectionString)
}catch(err){
    console.log(`Error in connceting mongoDB : ${err}`)
}

const UserSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        maxlength : 50,
        trim : true,
    },
    lastName : {
        type : String,
        required : true,
        maxlength : 50,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        maxlength : 100,
        trim : true,
        unique : true,
        lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address',
    ],
    },
    password : {
        type: String,
        required : true,
        maxlength : 150,
        minlength : 8
    }
})

const userAccountSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true 
    },
    balance : {
        type : Number,
        required : true 
    }
})
export const Account = mongoose.model("Account", userAccountSchema)
export const User = mongoose.model("User", UserSchema)
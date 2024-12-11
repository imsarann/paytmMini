import jwt  from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export default function authMiddleware(req, res, next){
    const token = req.headers.authorization.split(' ')[1]
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next();
    }catch(err){
        return res.json({message :  `Invalid Token ${err}`})
    }
}
import jwt from "jsonwebtoken";
import { Users } from "../models/userModel.js";
import dotenv from 'dotenv';

export const registerUser = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        let success = false;
        let check = await Users.findOne({email: req.body.email});
        if (check){
            return res.status(400).json({
                error:"Email already exists"
            })
        }
        
        let newUser = new Users({ name, email, password });
        await newUser.save();
        
        const data = {user: {id: newUser.id}}
        const token = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "72h", 
        });

        success = true;
        res.json({success,token})
    }
    catch (err){
        console.log("Error in Registering User", err);
        res.status(500).send("Internal Server Error")
    }

}
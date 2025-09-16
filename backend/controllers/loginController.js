import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import {Users} from '../models/userModel.js';

export const loginUser = async (req,res)=>{
    try{
        const {email, password} = req.body;
        let success = false;
        if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password){
            const data = { user: { id: 1, role: 'admin' } };

            const token = jwt.sign(data, process.env.JWT_SECRET, {
              expiresIn: "72h",
            });
            success=true;
            return res.json({success,token, message:'Admin login successful', role:'admin'})
        }

        let user = await Users.findOne({email: req.body.email});
        if (user){
            const compare = await bcrypt.compare(password, user.password)
            if (compare) {
                const data = { user: { id: user.id, role: user.role } };
                const token = jwt.sign(data, process.env.JWT_SECRET, {
                          expiresIn: "72h",
                        });
                success=true;
                return res.json({success,token})
            }

            else {
                return res.status(401).json({
                    message:'Invalid password'
                })
            }
        }

        else {
            return res.status(401).json({
                message:'No such email found'
            })
        }
    }
    

    catch(err) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Users } from '../models/userModel.js';
import { Doctor } from '../models/doctorModel.js';

dotenv.config();

export const addDoctor = async(req,res)=>{
    try{
        const {name, email, password, specialization} = req.body;
        let success=false;
        const check = await Users.findOne({email});
        if(check){
            return res.status(401).json({
                message:"Email already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new Users({
            name,
            email,
            password: hashedPassword,
            role: 'doctor'
        });
        await newUser.save();
        const newDoctorProfile = new Doctor({
            userId: newUser._id,
            specialization,
        });
        await newDoctorProfile.save();
        success=true;
        res.status(201).json({
            success,
            message:'Doctor added successfully',
            data:newUser
        })
    }
    catch(err){
        console.log("Error in adding doctor", err);
        res.status(400).json({
            message: 'Internal server error during adding doctor'
        })
    }
}

export const getAllDoctors = async(req,res)=>{
    try{
        const doctors=await Doctor.find().populate('userId');
        res.status(200).json(doctors)
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message || 'Internal server error while fetching all doctors'
        })
    }
}

export const deleteDoctor = async(req,res)=>{
    try{
        const {doctorId} = req.body;
        const doctor_profile = await Doctor.findById({userId:doctorId})
        if (!doctor_profile){
            return res.status(404).json({
                message: 'Doctor not found'
            })
        }
        
        const user_profile = doctor_profile.userId;
        await Doctor.findByIdAndDelete(doctorId);
        await Users.findByIdAndDelete(user_profile);
        res.status(200).json({
            message: 'Doctor deleted successfully'
        })

    }
    catch(err){
        console.log( "error in deleting doctor" ,err);
        res.status(500).json({
            message: err.message || 'Internal server error while deleting the doctor'
        })
    }
}
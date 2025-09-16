import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String, required: true },
    availability: { type: Object, default: {} },
    reviews: [ { type: Object } ]
})

export const Doctor = mongoose.model('Doctor', doctorSchema);
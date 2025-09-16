import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";
import { connectDB } from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", router );
app.use("/api/admin", adminRouter)

app.get("/", (req,res)=>{
    res.send("API is working fine!");
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})
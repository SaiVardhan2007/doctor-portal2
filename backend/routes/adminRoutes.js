import express from "express";
import { addDoctor, deleteDoctor, getAllDoctors } from "../controllers/adminController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", isAdmin, addDoctor);
adminRouter.get("/get-all-doctors", isAdmin, getAllDoctors);
adminRouter.delete("/delete-doctor/:id", isAdmin, deleteDoctor);

export default adminRouter;
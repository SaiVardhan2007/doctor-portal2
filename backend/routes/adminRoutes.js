import express from "express";
import { addDoctor, deleteDoctor, getAllDoctors } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.route("/add-doctor", addDoctor)
adminRouter.route("/get-all-doctors").get(getAllDoctors);
adminRouter.route("/delete_doctor/:id").delete(deleteDoctor);

export default adminRouter;
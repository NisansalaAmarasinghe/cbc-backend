import express from "express";

import { getStudents, createStudent, deleteStudent } from "../controllers/studentController.js";

//create studentRouter
const studentRouter = express.Router();

studentRouter.get("/",getStudents)

studentRouter.post("/",createStudent)

studentRouter.delete("/",deleteStudent)

export default studentRouter;
import express from "express";
import { createEmployee, deleteEmployee, displayEmployees, editEmployees, getSigleEmployee } from "../controllers/employeeController.js";


const router = express.Router();

router.post("/create-employee", createEmployee);
router.get("/display-employees", displayEmployees);
router.get("/employee/:id", getSigleEmployee);
router.put("/manage-employee/:id", editEmployees);
router.delete("/delete-employee/:id", deleteEmployee);

export default router;
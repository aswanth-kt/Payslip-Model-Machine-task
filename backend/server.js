import express from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

import employeeRouter from "./routes/employeeRoutes.js"

const app = express();
const port = process.env.PORT;

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));

// connecting to DB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/employee", employeeRouter);

app.listen(port, (err) => {
  if (err) console.error("Server error: ", err);
  console.log(`localhost: http://localhost:${port}`);
});
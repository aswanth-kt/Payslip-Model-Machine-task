import mongoose from "mongoose";

const payslipSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  },
  month: String,
  leaves: Number,
  grossSalary: Number,
  deductions: Number,
  netSalary: Number
});

module.exports = mongoose.model("Payslip", payslipSchema);
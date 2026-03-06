import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employeeId: String,
  designation: String,
  joiningDate: Date,
  basicSalary: {
    type: Number,
    required: true,
  },
  hraPercent: {
    type: Number,
    required: true,
  },
  daPercent: {
    type: Number,
    required: true,
  },
  allowancePercent: {
    type: Number,
    required: true,
  },
  esiPercent: {
    type: Number,
    required: true,
  },
  pfPercent: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Employee", employeeSchema);
import mongoose from "mongoose";
import Employee from "../model/employeeSchema.js";


export const createEmployee = async (req, res) => {
  try {

    const { name, employeeId, designation, joiningDate, basicSalary, hraPercent, daPercent, allowancePercent, esiPercent, pfPercent } = req.body;

    // Check the fields are empty
    if (!name || !employeeId || !designation || !joiningDate || !basicSalary || !hraPercent || !daPercent || !allowancePercent || !esiPercent || !pfPercent) {
      return res.status(400).json({
        success: false,
        message: "All fields are require!"
      })
    };

    console.log("body", req.body)

    const existEmployee = await Employee.findOne({ employeeId });

    if (existEmployee) {
      res.status(400).json({
        success: false,
        message: "This employeeId is already registered"
      })
    };

    const newEmployee = await Employee.create({
      name,
      employeeId,
      designation,
      joiningDate,
      basicSalary: Number(basicSalary),
      hraPercent: Number(hraPercent),
      daPercent: Number(daPercent),
      allowancePercent: Number(allowancePercent),
      esiPercent: Number(esiPercent),
      pfPercent: Number(pfPercent),
    });

    if (!newEmployee) {
      return res.status(404).json({
        success: false,
        message: "Failed to create an employee"
      });
    };

    return res.status(201).json({
      success: true,
      message: "Emplyee added successfully",
      // employee: newEmployee
    })
    
  } catch (error) {
    console.log("Error in create employees:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error"
    })
  }
};


export const displayEmployees = async (req, res) => {
  try {

    const allEmployees = await Employee.find();

    if (!allEmployees) {
      return res.status(404).json({
        success: false,
        message: "Employees not found"
      });
    };

    return res.status(200).json({
      success: true,
      message: "Employees data fetched",
      employees: allEmployees
    })
    
  } catch (error) {
    console.log("Error in display employees:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error"
    })
  }
};


export const getSigleEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if(!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Id is not valid"
      });
    };

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      })
    };

    return res.status(200).json({
      success: true,
      message: "employee fetched",
      employee
    })
    
  } catch (error) {
    console.log("Error in get single employee:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error"
    })
  }
}


export const editEmployees = async (req, res) => {
  try {

    const { id } = req.params;
    if(!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Id is not valid"
      });
    };

    const updateEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        $set: { 
          name: req.body.name,
          employeeId: req.body.employeeId,
          designation: req.body.designation,
          joiningDate: req.body.joiningDate,
          basicSalary: req.body.basicSalary,
          hraPercent: req.body.hraPercent,
          daPercent: req.body.daPercent,
          allowancePercent: req.body.allowancePercent,
          esiPercent: req.body.esiPercent,
          pfPercent: req.body.pfPercent,
        }
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `${req.body.name} details updated`,

    })
    
  } catch (error) {
    console.log("Error in edit employees:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error"
    })
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id"
      })
    };

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deleteEmployee) {
      return res.status(400).json({
        success: false,
        message: `Failed to delete ${deleteEmployee.name}. Try again`
      });
    };

    return res.status(200).json({
      success: true,
      message: `${deleteEmployee.name} deleted successfully`
    })

  } catch (error) {
    console.log("Error in delete employees:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error"
    })
  }
};


export const calculateSalary = async (req, res) => {
  try {

    const { emp_id, totalDay, leave } = req.body;

    if (totalDay == null || leave == null) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    };

    if (Number(leave) > Number(totalDay)) {
      return res.status(400).json({
        success: false,
        message: "Leave cannot be greater than total days"
      });
    }

    if (!emp_id) {
      return res.status(400).json({
        success: false,
        message: "Please select an employee"
      })
    }

    if (!mongoose.isValidObjectId(emp_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id"
      })
    };

    const employee = await Employee.findById(emp_id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      })
    };

    // calculate salary
    const totalPayableDay = Number(totalDay) - Number(leave)
    const perDaySalary = employee.basicSalary / Number(totalDay);

    const adjustBasicSalary = perDaySalary * totalPayableDay;
    const hra = adjustBasicSalary * (employee.hraPercent / 100);
    const da = adjustBasicSalary * (employee.daPercent / 100);
    const otherAllowances = adjustBasicSalary * (employee.allowancePercent / 100);

    const pf = adjustBasicSalary * (employee.pfPercent / 100);
    const esi = adjustBasicSalary * (employee.esiPercent / 100);

    const totalEarnings = adjustBasicSalary + hra + da + otherAllowances;
    const totalDeductions = pf + esi;

    const netSalary = totalEarnings - totalDeductions;

    const payslipData = {
      leave: Number(leave),
      totalPayableDay,
      perDaySalary,
      adjustBasicSalary: adjustBasicSalary.toFixed(2),
      hra: hra.toFixed(2),
      da: da.toFixed(2),
      otherAllowances: otherAllowances.toFixed(2),
      pf: pf.toFixed(2),
      esi: esi.toFixed(2),
      totalEarnings: totalEarnings.toFixed(2),
      totalDeductions: totalDeductions.toFixed(2),
      netSalary: netSalary.toFixed(2),
      employee
    };

    return res.status(200).json({
      success: true,
      message: "Payslip generated",
      payslipData
    })
    
  } catch (error) {
    console.log("Error in calculate employees salary:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server error"
    })
  }
}
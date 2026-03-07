import { useState } from "react";
import axios from "axios";
import "./EmployeeCreation.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const EmployeeCreation = () => {

  const [employee, setEmployee] = useState({
    name: "",
    employeeId: "",
    designation: "",
    joiningDate: "",
    basicSalary: "",
    hraPercent: "",
    daPercent: "",
    allowancePercent: "",
    esiPercent: "",
    pfPercent: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/create-employee`,
        employee
      );

      console.log(response.data.message);

      if (response.status === 201) {
        toast.success("The employee is created");
        navigate("/");
      }

      // clear form after submit
      setEmployee({
        name: "",
        employeeId: "",
        designation: "",
        joiningDate: "",
        basicSalary: "",
        hraPercent: "",
        daPercent: "",
        allowancePercent: "",
        esiPercent: "",
        pfPercent: ""
      });

    } catch (error) {

      console.error(error);

      if (error.response) {
        console.error(error.response.data.message);
      } else {
        console.log("Server error");
      }

    }
  };

  return (
    <div className="container">

      <h2>Create Employee</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Employee Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter employee name"
            value={employee.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            name="employeeId"
            placeholder="Enter employee ID"
            value={employee.employeeId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            placeholder="Enter designation"
            value={employee.designation}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={employee.joiningDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            placeholder="Enter basic salary"
            value={employee.basicSalary}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>HRA %</label>
          <input
            type="number"
            name="hraPercent"
            placeholder="Enter HRA %"
            value={employee.hraPercent}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>DA %</label>
          <input
            type="number"
            name="daPercent"
            placeholder="Enter DA %"
            value={employee.daPercent}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Allowance %</label>
          <input
            type="number"
            name="allowancePercent"
            placeholder="Enter allowance %"
            value={employee.allowancePercent}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>ESI %</label>
          <input
            type="number"
            name="esiPercent"
            placeholder="Enter ESI %"
            value={employee.esiPercent}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>PF %</label>
          <input
            type="number"
            name="pfPercent"
            placeholder="Enter PF %"
            value={employee.pfPercent}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create Employee</button>

      </form>

    </div>
  );
}

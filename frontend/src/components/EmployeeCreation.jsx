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

      if (response.status === 200) {
        toast.success("The employee is created");
        navigate("/");
      }

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
    <div style={{width:"400px", margin:"auto"}}>

      <h2>Create Employee</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={employee.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={employee.employeeId}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={employee.designation}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="date"
          name="joiningDate"
          value={employee.joiningDate}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="basicSalary"
          placeholder="Basic Salary"
          value={employee.basicSalary}
          onChange={handleChange}
        />

        <br /><br />
        <input
          type="number"
          name="hraPercent"
          placeholder="HRA %"
          value={employee.hraPercent}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="daPercent"
          placeholder="DA %"
          value={employee.daPercent}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="allowancePercent"
          placeholder="Allowance %"
          value={employee.allowancePercent}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="esiPercent"
          placeholder="ESI %"
          value={employee.esiPercent}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="pfPercent"
          placeholder="PF %"
          value={employee.pfPercent}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Create Employee</button>

      </form>

    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ManageEmployees = () => {

  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  // fetch single employee
  
  useEffect(() => {

    const getEmployee = async () => {
  
      try {
  
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/employee/employee/${id}`
        );
  
        const emp = res.data.employee;
        console.log("single employee", emp)
        setEmployee({
          ...emp,
          joiningDate: emp.joiningDate?.substring(0,10)
        });
  
      } catch (error) {
        console.log(error);
      }
  
    };

    getEmployee();

  }, [id]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/manage-employee/${id}`,
        employee
      );

      if (res.status === 200) {
        toast.success(`${res?.data?.message}` || "Updated")
      } else {
        toast.warning(`${res?.data?.message}` || "Something went wrong")
      }      

      navigate("/");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{width:"400px", margin:"auto"}}>

      <h2>Edit Employee</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
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

        <button type="submit">Update Employee</button>

      </form>

    </div>

  );
}

import { useEffect, useState } from "react";
import "./GeneratePayslip.css";
import axios from "axios";
import { toast } from "react-toastify";

export const GeneratePayslip = ({ setPayslip }) => {

  const [employees, setEmployees] = useState([]);
  const [emp_id, setEmp_id] = useState("");
  const [totalDay, setTotalDay] = useState("30");
  const [leave, setLeave] = useState("0");
  const [loading, setLoading] = useState(false);

  const getEmployees = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/employee/display-employees`);
      // console.log("gen emp:", res.data.employees)
      setEmployees(res.data.employees)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getEmployees()
  }, []);

  // get employee id from dropdown menu
  const handleDropdown = (e) => {
    // console.log("dropdown val:", e.target.value)
    setEmp_id(e.target.value)
  }

  // get total days count
  const handleTotalDays = (e) => {
    setTotalDay(e.target.value);
  }

  // get leave count
  const handleLeaveCount = (e) => {
    setLeave(e.target.value);
  };

  // Calculate salary
  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/employee/calculate-salary`,
        { emp_id, totalDay, leave }
      );
      console.log("calc res:", res);

      if (!res.data.success) {
        toast.warning(`${res.data?.message}` || "Somthing went wrong")
      }

      //pass res payslip data to payslip component
      setPayslip(res.data.payslipData);

      if (res.status === 200) {
        toast.success(`${res.data?.message}` || "Generate payslip successfully")
      }

      setLoading(false)

    } catch (error) {
      console.error(error.response?.data?.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="payslip-page">

      <h1 className="page-title">Generate Payslip</h1>

      <div className="salary-card">

        <div className="card-title">
          <span className="icon">🧮</span>
          <h2>Calculate Salary</h2>
        </div>

        <div className="salary-form">
          
          <div className="form-group">
            <label>Select Employee</label>
            <select onChange={handleDropdown}>
              <option value="" >-- Choose an employee --</option>
              {
                employees.map((emp) => {                  
                  return (
                    <option key={emp._id} value={emp._id} >
                      {emp.name} ({emp.designation}) 
                    </option>
                  )
                })
              }
            </select>
          </div>

          <div className="form-group">
            <label>Total Days in Month</label>
            <input type="number" value={totalDay} max={31} min={1} onChange={handleTotalDays} />
          </div>

          <div className="form-group">
            <label>Leave Taken (Days)</label>
            <input type="number" value={leave} min={0} onChange={handleLeaveCount} />
          </div>

          <div className="form-group button-area">
            <button disabled={loading} className="generate-btn" onClick={handleGenerate}>
              { loading ? "Generating..." : "Generate" }
              </button>
          </div>

        </div>

      </div>

    </div>
  );
};
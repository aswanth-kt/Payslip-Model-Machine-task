import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
const mySwal = withReactContent(Swal);

export const DisplayEmployees = () => {

  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const getEmployees = async () => {

    try {

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/employee/display-employees`);
      // console.log("emp", res.data.employees)
      setEmployees(res.data.employees);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getEmployees();
  }, []);

  //delete rmployee
  const handleDelete = async (id) => {
    const deleteConfirm = await mySwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    });

    if (!deleteConfirm.isConfirmed) {
      navigate("/");
      return toast.warning("The employee is not deleted");
    };

    const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/employee/delete-employee/${id}`)

    if (res.status === 200) {
      toast.success(`${res.data?.message}` || "The employee is deleted");
      navigate("/");
    }
  }

  // console.log("display emp:", employees);

  return (
    <div style={{ width: "90%", margin: "auto" }}>

      <h2>Employee List</h2>

      <table border="1" width="100%" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Designation</th>
            <th>Joining Date</th>
            <th>Basic Salary</th>
            <th>HRA %</th>
            <th>DA %</th>
            <th>Allowance %</th>
            <th>ESI %</th>
            <th>PF %</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.employeeId}</td>
              <td>{emp.designation}</td>
              <td>{new Date(emp.joiningDate).toLocaleDateString()}</td>
              <td>{emp.basicSalary}</td>
              <td>{emp.hraPercent}</td>
              <td>{emp.daPercent}</td>
              <td>{emp.allowancePercent}</td>
              <td>{emp.esiPercent}</td>
              <td>{emp.pfPercent}</td>
              <td>
                <Link to={`/manage-employee/${emp._id}`}>
                  Edit
                </Link>
                <Link 
                to={`/delete-employee/${emp._id}`}
                onClick={ () => handleDelete(emp._id) }
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}


import { Link } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2 className="logo">PayslipGen</h2>

      <ul className="menu">

        <li>
          <Link to="/" >Employees</Link>
        </li>

        <li>
          <Link to="/create-employee" >Add Employees</Link>
        </li>

        <li>
          <Link to="/generatePayslip" >Generate Payslip</Link>
        </li>

        <li>
          <Link to="#" >Settings</Link>
        </li>

        <li className="logout">
          <Link to="#" >Logout</Link>
        </li>

      </ul>

    </div>
  );
};
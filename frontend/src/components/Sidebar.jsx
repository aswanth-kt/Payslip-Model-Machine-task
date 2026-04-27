import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2 className="logo">PayslipGen</h2>

      <ul className="menu">

        <li>
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive ? "isActive" : ""
            }
          >
            Employees
          </NavLink>
        </li>

        <li>
          <NavLink
           to="/create-employee" 
           className={({isActive}) => 
            isActive ? "isActive" : ""
           }
          >
            Add Employees
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/generatePayslip" 
            className={({isActive}) =>
              isActive ? "isActive" : ""
            }
          >
            Generate Payslip
          </NavLink>
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
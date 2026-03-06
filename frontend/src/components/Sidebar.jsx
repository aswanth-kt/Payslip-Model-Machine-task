import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2 className="logo">PayslipGen</h2>

      <ul className="menu">

        <li>
          <a href="#">Employees</a>
        </li>

        <li>
          <a href="#">Generate Payslip</a>
        </li>

        <li>
          <a href="#">Settings</a>
        </li>

        <li className="logout">
          <a href="#">Logout</a>
        </li>

      </ul>

    </div>
  );
};
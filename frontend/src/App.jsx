import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import { DisplayEmployees } from './components/DisplayEmployees'
import { EmployeeCreation } from './components/EmployeeCreation'
import { ManageEmployees } from './components/ManageEmployees';
import { Sidebar } from './components/Sidebar';
import { PayslipPage } from './page/PayslipPage';

function App() {
  return (
    <>
    <Sidebar/>
    <div  style={{ marginLeft: "200px", padding: "20px" }}>
      <Routes>
        <Route path="/create-employee" element={<EmployeeCreation />} />
        <Route path="/" element={<DisplayEmployees />} />
        <Route path="/manage-employee/:id" element={<ManageEmployees />} />
        <Route path='/generatePayslip' element={<PayslipPage />} />
      </Routes>
    </div>
    </>
  )
}

export default App

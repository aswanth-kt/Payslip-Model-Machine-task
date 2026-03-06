import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import { DisplayEmployees } from './components/DisplayEmployees'
import { EmployeeCreation } from './components/EmployeeCreation'
import { ManageEmployees } from './components/ManageEmployees';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <>
    <Sidebar/>
    <Routes>
      <Route path="/create-employee" element={<EmployeeCreation />} />
      <Route path="/" element={<DisplayEmployees />} />
      <Route path="/manage-employee/:id" element={<ManageEmployees />} />
    </Routes>
    </>
  )
}

export default App

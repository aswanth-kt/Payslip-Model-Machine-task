import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import { DisplayEmployees } from './components/DisplayEmployees'
import { EmployeeCreation } from './components/EmployeeCreation'
import { ManageEmployees } from './components/ManageEmployees';

function App() {
  return (
    <>
    <Routes>
      <Route path="/create-employee" element={<EmployeeCreation />} />
      <Route path="/display-employee" element={<DisplayEmployees />} />
      <Route path="/manage-employee/:id" element={<ManageEmployees />} />
    </Routes>
    </>
  )
}

export default App

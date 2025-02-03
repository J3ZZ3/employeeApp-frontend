import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import './App.css';

const App = () => (
  <Router>
    <div className="app-container">
      <h1 className="app-title">Employee Management System</h1>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<EmployeeForm />} />
      </Routes>
    </div>
  </Router>
);

export default App;

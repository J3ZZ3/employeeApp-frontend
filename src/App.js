import React from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

const App = () => (
  <div>
    <h1>Employee Management System</h1>
    <EmployeeForm />
    <EmployeeList />
  </div>
);

export default App;

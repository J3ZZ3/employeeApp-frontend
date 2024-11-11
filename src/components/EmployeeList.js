import React, { useEffect, useState } from 'react';
import { getEmployees, updateEmployee, deleteEmployee } from '../api';
import Swal from 'sweetalert2';
import '../styles/EmployeeList.css';
import EmployeeSearch from './EmployeeSearch'; 

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [error, setError] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
      setFilteredEmployees(response.data); 
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to load employees. Please check your network connection or backend API.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();

      Swal.fire({
        title: 'Success!',
        text: 'Employee deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('Failed to delete employee. Please try again later.');
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete employee. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(editingEmployee.id, editingEmployee);
      setEditingEmployee(null);
      fetchEmployees();

      Swal.fire({
        title: 'Success!',
        text: 'Employee updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Failed to update employee.');
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update employee. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee((prev) => ({ ...prev, [name]: value }));
  };

  
  const searchEmployees = (query) => {
    const filtered = employees.filter(employee =>
      employee.name.toLowerCase().includes(query.toLowerCase()) ||
      employee.surname.toLowerCase().includes(query.toLowerCase()) ||
      employee.idNumber.includes(query) ||
      employee.role.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <h3>Employee List</h3>

      {/* Add the search input and button */}
      <EmployeeSearch searchEmployees={searchEmployees} />

      {filteredEmployees.length === 0 && !error ? (
        <p>No employees found</p>
      ) : (
        <ul className="employee-list">
          {filteredEmployees.map((employee) => (
            <li key={employee.id}>
              <div>
                <p>{employee.name} {employee.surname}</p>
                <p>{employee.age} years old</p>
                <p>ID: {employee.idNumber}</p>
                <p>Role: {employee.role}</p>
              </div>
              <div>
                <button className="edit-button" onClick={() => handleEdit(employee)}>Edit</button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingEmployee && (
        <form onSubmit={handleUpdate} className="form-container">
          <h3>Edit Employee</h3>
          <input
            className="input"
            type="text"
            name="name"
            value={editingEmployee.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            className="input"
            type="text"
            name="surname"
            value={editingEmployee.surname}
            onChange={handleChange}
            placeholder="Surname"
          />
          <input
            className="input"
            type="number"
            name="age"
            value={editingEmployee.age}
            onChange={handleChange}
            placeholder="Age"
          />
          <input
            className="input"
            type="text"
            name="role"
            value={editingEmployee.role}
            onChange={handleChange}
            placeholder="Role"
          />
          <button type="submit" className="button">Update Employee</button>
        </form>
      )}
    </div>
  );
};

export default EmployeeList;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, updateEmployee, deleteEmployee } from '../api';
import Swal from 'sweetalert2';
import '../styles/EmployeeList.css';
import EmployeeSearch from './EmployeeSearch';
import Loader from './Loader';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [error, setError] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await getEmployees();
      const employeeData = Array.isArray(response) ? response : response.data || [];
      setEmployees(employeeData);
      setFilteredEmployees(employeeData);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to load employees. Please check your network connection or backend API.');
    } finally {
      setIsLoading(false);
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

  const handleAddEmployee = () => {
    navigate('/add');
  };

  return (
    <div className="employee-list">
      <div className="list-header">
        <EmployeeSearch searchEmployees={(query) => {
          const filtered = employees.filter(emp => 
            emp.name?.toLowerCase().includes(query.toLowerCase()) ||
            emp.surname?.toLowerCase().includes(query.toLowerCase()) ||
            emp.idNumber?.toLowerCase().includes(query.toLowerCase()) ||
            emp.role?.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredEmployees(filtered);
        }} />
        <button className="button-17 primary" onClick={handleAddEmployee}>
          Add New Employee
        </button>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      {isLoading ? (
        <Loader />
      ) : (
        <div className="employees-grid">
          {filteredEmployees.map(employee => (
            <div key={employee.id} className="employee-card">
              <div className="employee-image">
                {employee.photo ? (
                  <img 
                    src={`data:image/jpeg;base64,${employee.photo}`} 
                    alt={`${employee.name} ${employee.surname}`}
                  />
                ) : (
                  <div className="placeholder-image">
                    {employee.name?.[0]}{employee.surname?.[0]}
                  </div>
                )}
              </div>
              <div className="employee-details">
                <h3>{employee.name} {employee.surname}</h3>
                <p><strong>Age:</strong> {employee.age} years</p>
                <p><strong>ID:</strong> {employee.idNumber}</p>
                <p><strong>Role:</strong> {employee.role}</p>
                <div className="employee-actions">
                  <button className="button-17" onClick={() => handleEdit(employee)}>
                    Edit
                  </button>
                  <button className="button-17 danger" onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingEmployee && (
        <div className="modal">
          <form onSubmit={handleUpdate} className="edit-form">
            <h3>Edit Employee</h3>
            <input
              type="text"
              name="name"
              value={editingEmployee.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="surname"
              value={editingEmployee.surname}
              onChange={handleChange}
              placeholder="Surname"
            />
            <input
              type="number"
              name="age"
              value={editingEmployee.age}
              onChange={handleChange}
              placeholder="Age"
            />
            <input
              type="text"
              name="role"
              value={editingEmployee.role}
              onChange={handleChange}
              placeholder="Role"
            />
            <div className="form-actions">
              <button type="submit" className="button-17 success">Update</button>
              <button 
                type="button" 
                className="button-17 warning" 
                onClick={() => setEditingEmployee(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;

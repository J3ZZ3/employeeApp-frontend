import React, { useState } from 'react';
import { addEmployee } from '../api';
import Swal from 'sweetalert2';
import '../styles/EmployeeForm.css';  

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    idNumber: '',
    role: '',
    photo: '',
  });
  const [error, setError] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result.split(',')[1] }); 
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(formData);
      setFormData({ name: '', surname: '', age: '', idNumber: '', role: '', photo: '' });
      setError('');
      
      Swal.fire({
        title: 'Success!',
        text: 'Employee added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      setError('Failed to add employee. Please try again.');
      console.error('Add Employee Error:', error);
      
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add employee. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Add Employee</h3>
      <input
        className="input"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        className="input"
        type="text"
        placeholder="Surname"
        value={formData.surname}
        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
      />
      <input
        className="input"
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
      />
      <input
        className="input"
        type="text"
        placeholder="ID Number"
        value={formData.idNumber}
        onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
      />
      <input
        className="input"
        type="text"
        placeholder="Role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      />
      <input
        className="input"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
      />
      <button type="submit" className="button">Add Employee</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default EmployeeForm;

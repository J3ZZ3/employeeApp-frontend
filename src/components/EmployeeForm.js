import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../api';
import Swal from 'sweetalert2';
import '../styles/EmployeeForm.css';  
import Loader from './Loader';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    idNumber: '',
    role: '',
    photo: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress and convert to JPEG format
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl.split(',')[1]);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        setFormData({ ...formData, photo: compressedImage });
      } catch (error) {
        console.error('Error compressing image:', error);
        setError('Failed to process image. Please try again with a smaller image.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addEmployee(formData);
      setFormData({ name: '', surname: '', age: '', idNumber: '', role: '', photo: '' });
      setError('');
      
      Swal.fire({
        title: 'Success!',
        text: 'Employee added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/'); // Navigate back to list after successful addition
      });
    } catch (error) {
      console.error('Add Employee Error:', error);
      setError('Failed to add employee. Please try again.');
      
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add employee. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      {isSubmitting ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <h3>Add New Employee</h3>
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
          <div className="form-actions">
            <button type="submit" className="button-17 success">
              Add Employee
            </button>
            <button 
              type="button" 
              className="button-17 warning" 
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default EmployeeForm;

import React, { useState } from 'react';
import '../styles/EmployeeSearch.css';
import Swal from 'sweetalert2';

const EmployeeSearch = ({ searchEmployees }) => {
  const [query, setQuery] = useState('');
  const [ageRange, setAgeRange] = useState({ min: '', max: '' });

  const handleSearch = () => {
    searchEmployees(query, ageRange);
  };

  const showAgeFilterModal = () => {
    Swal.fire({
      title: 'Filter by Age',
      html: `
        <div class="age-filter-modal">
          <div class="age-input-group">
            <label>Minimum Age:</label>
            <input 
              type="number" 
              id="minAge" 
              class="swal2-input" 
              value="${ageRange.min}"
              min="0"
              placeholder="Min Age"
            >
          </div>
          <div class="age-input-group">
            <label>Maximum Age:</label>
            <input 
              type="number" 
              id="maxAge" 
              class="swal2-input" 
              value="${ageRange.max}"
              min="0"
              placeholder="Max Age"
            >
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Apply Filter',
      cancelButtonText: 'Clear Filter',
      showCloseButton: true,
      preConfirm: () => {
        const minAge = document.getElementById('minAge').value;
        const maxAge = document.getElementById('maxAge').value;
        
        if (minAge && maxAge && parseInt(minAge) > parseInt(maxAge)) {
          Swal.showValidationMessage('Minimum age cannot be greater than maximum age');
          return false;
        }
        
        return { min: minAge, max: maxAge };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setAgeRange(result.value);
        searchEmployees(query, result.value);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setAgeRange({ min: '', max: '' });
        searchEmployees(query, { min: '', max: '' });
      }
    });
  };

  return (
    <div className="search-container">
      <div className="search-inputs">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            searchEmployees(e.target.value, ageRange);
          }}
          placeholder="Search by Name, Surname, ID, or Role"
          className="search-text"
        />
        <button 
          className={`button-17 ${ageRange.min || ageRange.max ? 'primary' : ''}`}
          onClick={showAgeFilterModal}
        >
          {ageRange.min || ageRange.max ? 
            `Age: ${ageRange.min || '0'} - ${ageRange.max || '∞'}` : 
            'Filter by Age'}
        </button>
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default EmployeeSearch;

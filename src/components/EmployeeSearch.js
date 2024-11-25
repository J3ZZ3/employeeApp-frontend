import React, { useState } from 'react';
import '../styles/EmployeeSearch.css';

const EmployeeSearch = ({ searchEmployees }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim() === '') {
      return;
    }
    searchEmployees(query); // Trigger search in EmployeeList
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by Name, Surname, ID, or Role"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default EmployeeSearch;

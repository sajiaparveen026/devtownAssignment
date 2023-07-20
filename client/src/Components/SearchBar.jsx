import React, { useState } from 'react';


const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search notes..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;

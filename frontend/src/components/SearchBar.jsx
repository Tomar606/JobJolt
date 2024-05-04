import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ placeholder, handleChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangeLocal = (event) => {
    setSearchTerm(event.target.value);
    handleChange(event.target.value);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="flex items-center w-1/2 mx-auto rounded-full bg-white shadow-md">
      <input
        type="search"
        className="w-full p-2 text-lg border-none rounded-l-full focus:outline-none"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChangeLocal}
      />
      <button
        className="p-2 bg-blue-500 rounded-r-full hover:bg-blue-600 focus:outline-none"
        onClick={handleSearch}
      >
        <FaSearch className="text-white" />
      </button>
    </div>
  );
};

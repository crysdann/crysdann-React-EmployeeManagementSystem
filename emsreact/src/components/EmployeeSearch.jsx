import React from "react";
import "./styles.css";

function EmployeeSearch({ filter, setFilter }) {
  return (
    <div className="search">
      <label>Search: </label>
      <input
        className="search-input"
        type="text"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}></input>
    </div>
  );
}

export default EmployeeSearch;

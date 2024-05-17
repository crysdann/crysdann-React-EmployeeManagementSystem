import React from "react";
import "./styles.css";

const employeeTypes = ["Seasonal", "FullTime", "PartTime", "Contract"];

function EmployeeType({ filter, setFilter }) {
  return (
    <div className="employee-type">
      <label>Filter by EmployeeType: </label>
      <select
        className="search-input"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        {employeeTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EmployeeType;

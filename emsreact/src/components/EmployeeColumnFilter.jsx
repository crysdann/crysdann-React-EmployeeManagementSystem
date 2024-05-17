import React from "react";

const EmployeeColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = [...new Set(preFilteredRows.map((row) => row.values[id]))];

  return (
    <select
      className="filter-dropdown"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}>
      <option value="">All</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default EmployeeColumnFilter;

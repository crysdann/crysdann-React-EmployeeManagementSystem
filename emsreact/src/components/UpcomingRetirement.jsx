import React, { useMemo, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import { COLUMNS } from "./columns.js";
import EmployeeColumnFilter from "./EmployeeColumnFilter.jsx";
import EmployeeTypeFilter from "./EmployeeTypeFilter.jsx";
import EmployeeSearch from "./EmployeeSearch.jsx";

const GET_EMPLOYEES = gql`
  query Employees {
    retiredemployees {
      _id
      employeeid
      FirstName
      LastName
      DateOfBirth
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
    }
  }
`;

const UpcomingRetirement = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState("");

  const columns = useMemo(() => COLUMNS, []);
  const employeedata = useMemo(
    () => data?.retiredemployees || [],
    [data?.retiredemployees]
  );

  function formatDate(dateString) {
    const timestamp = parseInt(dateString);
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const tableInstance = useTable(
    {
      columns,
      data: employeedata,
    },
    useFilters,
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h4 className="column-filter-header">Upcoming Retirement</h4>
      <div className="column-filter-div">
        <div className="header-line"></div>
      </div>
      <div className="employee-type-filter">
        <EmployeeTypeFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div className="employee-table-container column-filter-table">
        <table className="employee-table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="employee-table-th"
                    {...column.getHeaderProps()}>
                    {column.render("Header")}
                    {/* <div>
                      {column.id === "EmployeeType" && column.canFilter
                        ? column.render("Filter")
                        : null}
                    </div> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="employee-table-tr" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className="employee-table-td" {...cell.getCellProps()}>
                      {cell.column.id === "DateOfJoining" ||
                      cell.column.id === "DateOfBirth"
                        ? formatDate(cell.value)
                        : cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UpcomingRetirement;

import React, { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { useTable, useGlobalFilter } from "react-table";
import { COLUMNS } from "./columns";
import EmployeeSearch from "./EmployeeSearch.jsx";

const GET_EMPLOYEES = gql`
  query Employees {
    employees {
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

const EmployeeTable = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const columns = useMemo(() => COLUMNS, []);
  const employeedata = useMemo(() => data?.employees || [], [data?.employees]);

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

  return (
    <>
      <EmployeeSearch
        filter={globalFilter}
        setFilter={setGlobalFilter}></EmployeeSearch>
      <div className="employee-table-container">
        <table className="employee-table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="employee-table-th"
                    {...column.getHeaderProps()}>
                    {column.render("Header")}
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

export default EmployeeTable;

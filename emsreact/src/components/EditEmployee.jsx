import React, { useMemo, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useTable, useGlobalFilter } from "react-table";
import { COLUMNS } from "./columns";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Modal } from "./Modal.jsx";
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

const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($_id: ID!) {
    deleteEmployee(_id: $_id)
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $employeeid: String!
    $Title: String
    $Department: String
    $CurrentStatus: String
  ) {
    updateEmployee(
      employeeid: $employeeid
      Title: $Title
      Department: $Department
      CurrentStatus: $CurrentStatus
    )
  }
`;

const EditEmployee = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const [successMessage, setSuccessMessage] = useState("");
  // update
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

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

  const handleDeleteRow = async (_id) => {
    try {
      console.log(`handledeleterow ${_id}`);
      const employeeToDelete = employeedata.find(
        (employee) => employee._id === _id
      );
      if (employeeToDelete.CurrentStatus != "working") {
        await deleteEmployee({
          variables: { _id },
        });
        console.log(`Employee with ID ${_id} deleted successfully.`);
        setSuccessMessage("Employee deleted successfully.");
      } else {
        setSuccessMessage("CAN’T DELETE EMPLOYEE – STATUS ACTIVE");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleSubmit = async (updatedRow) => {
    // debugger;
    try {
      await updateEmployee({
        variables: {
          employeeid: rowToEdit.original.employeeid,
          Title: updatedRow.Title,
          Department: updatedRow.Department,
          CurrentStatus: updatedRow.CurrentStatus,
        },
        refetchQueries: [{ query: GET_EMPLOYEES }],
      });
      console.log(
        `Employee with ID ${rowToEdit.employeeid} updated successfully.`
      );
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleEditRow = (row) => {
    setSelectedRow(row);
    setRowToEdit(row);
    setModalOpen(true);
  };

  return (
    <>
      {successMessage && (
        <div className="employee-deleted-success">{successMessage}</div>
      )}
      <h4 className="column-filter-header">Edit Employee Details</h4>
      <div className="column-filter-div">
        <div className="header-line"></div>
      </div>

      {modalOpen && (
        <>
          {console.log("Selected Row:", selectedRow)}
          <Modal
            closeModal={() => setModalOpen(false)}
            employee={selectedRow}
            onSubmit={handleSubmit}
            firstName={selectedRow.original.FirstName}
            title={selectedRow.original.Title}
            department={selectedRow.original.Department}
            employeeType={selectedRow.original.EmployeeType}
            currentStatus={selectedRow.original.CurrentStatus}
          />
        </>
      )}
      <div className="employee-table-container edit-table">
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
                <th className="employee-table-th">Edit</th>
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
                  <td className="employee-table-td">
                    <span className="actions">
                      <BsFillPencilFill
                        className="edit edit-btn"
                        onClick={() => handleEditRow(row)}></BsFillPencilFill>
                      <BsFillTrashFill
                        className="edit delete-btn"
                        onClick={() =>
                          handleDeleteRow(row.original._id)
                        }></BsFillTrashFill>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditEmployee;

import EmployeeColumnFilter from "./EmployeeColumnFilter.jsx";

export const COLUMNS = [
  // {
  //   Header: "_id",
  //   accessor: "_id",
  // },
  {
    Header: "Id",
    accessor: "employeeid",
  },
  {
    Header: "First Name",
    accessor: "FirstName",
  },
  {
    Header: "Last Name",
    accessor: "LastName",
  },
  {
    Header: "Date Of Birth",
    accessor: "DateOfBirth",
  },
  {
    Header: "Age",
    accessor: "Age",
  },
  {
    Header: "Date Of Joining",
    accessor: "DateOfJoining",
  },
  {
    Header: "Title",
    accessor: "Title",
  },
  {
    Header: "Department",
    accessor: "Department",
  },
  {
    Header: "Employee Type",
    accessor: "EmployeeType",
    Filter: EmployeeColumnFilter,
  },
  {
    Header: "Current Status",
    accessor: "CurrentStatus",
  },
];

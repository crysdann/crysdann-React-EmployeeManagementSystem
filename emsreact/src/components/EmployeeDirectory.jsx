import React from "react";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeCreate from "./EmployeeCreate.jsx";
import "./styles.css";
import { Navbar } from "react-bootstrap";
import MenuBar from "./MenuBar.jsx";

function EmployeeDirectory() {
  return (
    <div>
      <EmployeeTable></EmployeeTable>
      {/* <EmployeeCreate></EmployeeCreate> */}
    </div>
  );
}

export default EmployeeDirectory;

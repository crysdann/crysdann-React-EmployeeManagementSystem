import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function ColorSchemesExample() {
  return (
    <>
      <h2 className="header">Employee Management System</h2>
      <Navbar bg="light" data-bs-theme="light" className="menu">
        <Container>
          {/* <Link to="/" className="menuBar-brand">
            EMS
          </Link> */}
          <Nav className="me-auto">
            <Link to="/" className="menuBar-Links">
              Home
            </Link>
            <Link to="EmployeeCreate" className="menuBar-Links">
              Create Employee
            </Link>
            <Link to="EmployeeListFilterTable" className="menuBar-Links">
              Employee List Filter
            </Link>
            <Link to="EditEmployee" className="menuBar-Links">
              Edit Employee details
            </Link>
            <Link to="UpcomingRetirement" className="menuBar-Links">
              Upcoming Retirement
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;

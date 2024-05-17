import React from "react";
import "./App.css";
import EmployeeDirectory from "./components/EmployeeDirectory.jsx";
import { Routes, Route } from "react-router-dom";
import EmployeeListFilterTable from "./components/EmployeeListFilterTable.jsx";
import MenuBar from "./components/MenuBar.jsx";
import EmployeeCreate from "./components/EmployeeCreate.jsx";
import EditEmployee from "./components/EditEmployee.jsx";
import UpcomingRetirement from "./components/UpcomingRetirement.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <>
      <h4 className="react-environment">
        React webpack - {process.env.NODE_ENV}
        {process.env.name}
      </h4>
      <MenuBar />
      <Routes>
        <Route path="/" element={<EmployeeDirectory />} />
        <Route path="EmployeeCreate" element={<EmployeeCreate />} />
        <Route
          path="EmployeeListFilterTable"
          element={<EmployeeListFilterTable />}
        />
        <Route path="EditEmployee" element={<EditEmployee />} />
        <Route path="UpcomingRetirement" element={<UpcomingRetirement />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

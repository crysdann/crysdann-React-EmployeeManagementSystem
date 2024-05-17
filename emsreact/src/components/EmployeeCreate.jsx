import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

const ADD_EMPLOYEES = gql`
  mutation createEmployee(
    $employeeid: String
    $FirstName: String
    $LastName: String
    $DateOfBirth: String
    $Age: Int
    $DateOfJoining: String
    $Title: String
    $Department: String
    $EmployeeType: String
    $CurrentStatus: String
  ) {
    createEmployee(
      employeeid: $employeeid
      FirstName: $FirstName
      LastName: $LastName
      DateOfBirth: $DateOfBirth
      Age: $Age
      DateOfJoining: $DateOfJoining
      Title: $Title
      Department: $Department
      EmployeeType: $EmployeeType
      CurrentStatus: $CurrentStatus
    ) {
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

function EmployeeCreate() {
  const [createEmployee, { loading, error }] = useMutation(ADD_EMPLOYEES);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isCreated, setIsCreated] = useState(false);

  const [inputField, setInputField] = useState({
    employeeid: "",
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Age: "",
    DateOfJoining: "",
    Title: "",
    Department: "",
    EmployeeType: "",
    CurrentStatus: "working",
  });

  function generateShortEmployeeId() {
    const timestamp = Date.now().toString().slice(-3);
    console.log("Date.now()" + Date.now());
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${timestamp}${randomNum}`;
  }

  const onSubmit = handleSubmit(async () => {
    try {
      const newEmployeeId = generateShortEmployeeId();
      await createEmployee({
        variables: { ...inputField, employeeid: newEmployeeId },
      });

      setInputField({
        employeeid: "",
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        Age: "",
        DateOfJoining: "",
        Title: "",
        Department: "",
        EmployeeType: "",
      });
      setIsCreated(true);
    } catch (err) {
      console.error("Error submitting form:", error);
    }
  });

  return (
    <div>
      {/* {data && <p>{JSON.stringify(data)}</p>} */}
      {loading && <p>Submitting</p>}
      {error && <p>error: {error.message}</p>}
      {isCreated && (
        <p className="employee-created">
          Employee details created successfully
        </p>
      )}
      <h4 className="column-filter-header">
        Employee table - Filter by column
      </h4>
      <div className="column-filter-div">
        <div className="header-line"></div>
      </div>
      <div className="create-employee">
        <form onSubmit={handleSubmit(onSubmit)} className="grid-fields">
          <label className="create-labels">First Name</label>
          <input
            {...register("FirstName", { required: true })}
            placeholder="First Name"
            id="FirstName"
            className="grid-fields-input"
            value={inputField.FirstName}
            onChange={(e) =>
              setInputField({ ...inputField, FirstName: e.target.value })
            }
          />
          {errors.FirstName && errors.FirstName.type === "required" && (
            <span className="create-form-error">First Name is required</span>
          )}
          <label className="create-labels">Last Name</label>
          <input
            {...register("LastName", { required: true })}
            placeholder="Last Name"
            id="LastName"
            className="grid-fields-input"
            value={inputField.LastName}
            onChange={(e) =>
              setInputField({ ...inputField, LastName: e.target.value })
            }
          />
          {errors.LastName && errors.LastName.type === "required" && (
            <span className="create-form-error">Last Name is required</span>
          )}
          <label className="create-labels">Date Of Birth</label>
          <input
            type="Date"
            {...register("DateOfBirth", { required: true })}
            placeholder="Date Of Birth"
            id="DateOfBirth"
            className="grid-fields-input"
            value={inputField.DateOfBirth}
            onChange={(e) =>
              setInputField({ ...inputField, DateOfBirth: e.target.value })
            }
          />
          {errors.DateOfBirth && errors.DateOfBirth.type === "required" && (
            <span className="create-form-error">Date Of Birth is required</span>
          )}
          <label className="create-labels">Age</label>
          <input
            {...register("Age", {
              required: true,
              min: { value: 20 },
              max: { value: 70 },
            })}
            placeholder="Age"
            id="Age"
            className="grid-fields-input"
            value={inputField.Age}
            onChange={(e) =>
              setInputField({ ...inputField, Age: parseInt(e.target.value) })
            }
          />
          {errors.Age && errors.Age.type === "required" && (
            <span className="create-form-error">Age is required</span>
          )}
          {errors.Age && errors.Age.type === "min" && (
            <span className="create-form-error">Age must be minimum 20</span>
          )}
          {errors.Age && errors.Age.type === "max" && (
            <span className="create-form-error">Age must be less than 70</span>
          )}
          <label className="create-labels">Date Of Joining</label>
          <input
            type="Date"
            {...register("DateOfJoining", { required: true })}
            placeholder="Date Of Joining"
            id="DateOfJoining"
            className="grid-fields-input"
            value={inputField.DateOfJoining}
            onChange={(e) =>
              setInputField({ ...inputField, DateOfJoining: e.target.value })
            }
          />
          {errors.DateOfJoining && errors.DateOfJoining.type === "required" && (
            <span className="create-form-error">
              Date Of Joining is required
            </span>
          )}
          <label className="create-labels">Title</label>
          <select
            id="Title"
            {...register("Title", { required: true })}
            value={inputField.Title}
            onChange={(e) =>
              setInputField({ ...inputField, Title: e.target.value })
            }>
            <option value="">Select Title</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="director">Director</option>
            <option value="vp">VP</option>
          </select>
          {errors.Title && errors.Title.type === "required" && (
            <span className="create-form-error">Title is required</span>
          )}
          <label className="create-labels">Department</label>
          <select
            id="Department"
            {...register("Department", { required: true })}
            value={inputField.Department}
            onChange={(e) =>
              setInputField({ ...inputField, Department: e.target.value })
            }>
            <option value="">Select Department</option>
            <option value="it">IT</option>
            <option value="marketing">Marketing</option>
            <option value="hr">HR</option>
            <option value="engineering">Engineering</option>
          </select>
          {errors.Department && errors.Department.type === "required" && (
            <span className="create-form-error">Department is required</span>
          )}
          <label className="create-labels">Employee Type</label>
          <select
            id="EmployeeType"
            {...register("EmployeeType", { required: true })}
            value={inputField.EmployeeType}
            onChange={(e) =>
              setInputField({ ...inputField, EmployeeType: e.target.value })
            }>
            <option value="">Select EmployeeType</option>
            <option value="fulltime">FullTime</option>
            <option value="parttime">PartTime</option>
            <option value="contract">Contract</option>
            <option value="seasonal">Seasonal</option>
          </select>
          {errors.EmployeeType && errors.EmployeeType.type === "required" && (
            <span className="create-form-error">EmployeeType is required</span>
          )}
          <div className="create-employee-btn">
            <input type="submit" className="btn-create" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeCreate;

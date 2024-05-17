import React, { useState, useEffect } from "react";

export const Modal = ({
  closeModal,
  employee,
  onSubmit,
  firstName,
  title,
  department,
  employeeType,
  currentStatus,
}) => {
  // debugger;
  const [formState, setFormState] = useState({
    FirstName:
      employee &&
      employee.cells &&
      employee.cells[1] &&
      employee.cells[1].value,
    Title:
      employee &&
      employee.cells &&
      employee.cells[5] &&
      employee.cells[5].value,
    Department:
      employee &&
      employee.cells &&
      employee.cells[6] &&
      employee.cells[6].value,
    CurrentStatus:
      employee &&
      employee.cells &&
      employee.cells[8] &&
      employee.cells[8].value,
  });

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.CurrentStatus) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("onchange ", { value });
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formState);
    closeModal();
  };

  useEffect(() => {
    console.log("formState", formState);
  }, [formState]);

  return (
    <div className="modal-container">
      <button className="close-button" onClick={closeModal}>
        close
      </button>
      {/* <div className="modal"> */}
      <form>
        <div className="form-group-modal">
          <div className="form-element-modal">
            <label>First Name </label>
            <input
              id="FirstName"
              name="FirstName"
              value={firstName}
              placeholder="First Name"
              readOnly></input>
          </div>
          <div className="form-element-modal">
            <label>Title</label>
            <select
              id="Title"
              name="Title"
              value={formState.Title}
              onChange={(e) =>
                setFormState({ ...formState, Title: e.target.value })
              }>
              <option value="">Select Title</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="director">Director</option>
              <option value="vp">VP</option>
            </select>
          </div>
          <div className="form-element-modal">
            <label>Department</label>
            <select
              id="Department"
              name="Department"
              value={formState.Department}
              onChange={handleChange}>
              <option value="">Select Department</option>
              <option value="marketing">Marketing</option>
              <option value="it">IT</option>
              <option value="engineering">Engineering</option>
              <option value="hr">HR</option>
            </select>
          </div>
          <div className="form-element-modal">
            <label>Current Status</label>
            <select
              id="CurrentStatus"
              name="CurrentStatus"
              value={formState.CurrentStatus}
              onChange={handleChange}>
              <option value="">Select CurrentStatus</option>
              <option value="working">Working</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>
        {errors && (
          <div className="modal-errors form-element-modal">{`Please include: ${errors}`}</div>
        )}
        <button type="submit" className="form-edit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </form>

      {/* </div> */}
    </div>
  );
};

const mongoose = require("mongoose");

const EMS = mongoose.model("EMS", {
  // _id: mongoose.Schema.Types.ObjectId,
  employeeid: String,
  FirstName: String,
  LastName: String,
  DateOfBirth: Date,
  Age: Number,
  DateOfJoining: Date,
  Title: String,
  Department: String,
  EmployeeType: String,
  CurrentStatus: String,
});

module.exports = { EMS };

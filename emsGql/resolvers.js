const { EMS } = require("./models/Employee.js");

const resolvers = {
  Query: {
    employees: async () => await EMS.find({}),
    employee: async (_, { id }) => await EMS.findById(id),

    retiredemployees: async () => {
      const today = new Date();
      const sixMonthsLater = new Date();
      sixMonthsLater.setMonth(today.getMonth() + 6);
      const employees = await EMS.find({});
      const retiringSoon = employees.filter((employee) => {
        const retirementDate = new Date(employee.DateOfBirth);
        retirementDate.setFullYear(retirementDate.getFullYear() + 65);
        return retirementDate > today && retirementDate <= sixMonthsLater;
      });
      return retiringSoon;
    },
  },

  Mutation: {
    createEmployee: async (_, args) => {
      try {
        const { _id, ...restArgs } = args;
        console.log("resolver", _id);
        console.log(`rest of the args ${JSON.stringify(args)}`);
        const CurrentStatus = {
          ...restArgs,
          CurrentStatus: args.CurrentStatus || "Working",
        };
        const newEmployee = new EMS(CurrentStatus);
        console.log(`new employee ${newEmployee}`);
        await newEmployee.save();
        return newEmployee;
      } catch (error) {
        console.error("Error creating employee:", error);
        throw new Error("Error creating employee");
      }
    },
    deleteEmployee: async (_, { _id }) => {
      try {
        const deletedEmployee = await EMS.findByIdAndDelete(_id);
        if (deletedEmployee) {
          console.log(`Employee with ID ${_id} deleted successfully.`);
          return true;
        } else {
          console.error(`Failed to delete employee with ID ${_id}.`);
          return false;
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        throw new Error("Error deleting employee");
      }
    },
    updateEmployee: async (
      _,
      { employeeid, Title, Department, CurrentStatus }
    ) => {
      try {
        const updatedEmployee = await EMS.findOneAndUpdate(
          { employeeid: employeeid },
          {
            Title: Title,
            Department: Department,
            CurrentStatus: CurrentStatus,
          },
          { new: true }
        );
        if (updatedEmployee) {
          console.log(
            `Employee with ID ${employeeid} ${Title} updated successfully.`
          );
          return true;
        } else {
          console.error(`Failed to update employee with ID ${employeeid}.`);
          return false;
        }
      } catch (error) {
        console.error("Error updating employee:", error);
        throw new Error("Error updating employee");
      }
    },
  },
};

module.exports = { resolvers };

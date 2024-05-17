const gql = require("graphql-tag");

const employeeGqlSchema = gql`
  type Query {
    employees: [Employee]!
    employee(id: ID!): Employee
    retiredemployees: [Employee]!
  }

  type Mutation {
    createEmployee(
      employeeid: String
      FirstName: String
      LastName: String
      DateOfBirth: String
      Age: Int
      DateOfJoining: String
      Title: String
      Department: String
      EmployeeType: String
      CurrentStatus: String
    ): Employee!
    deleteEmployee(_id: ID!): Boolean
    updateEmployee(
      employeeid: String!
      Title: String
      Department: String
      CurrentStatus: String
    ): Boolean
  }

  type Employee {
    _id: ID!
    employeeid: String
    FirstName: String
    LastName: String
    DateOfBirth: String
    Age: Int
    DateOfJoining: String
    Title: String
    Department: String
    EmployeeType: String
    CurrentStatus: String
  }
`;

module.exports = { employeeGqlSchema };

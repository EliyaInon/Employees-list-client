import { type } from "os"
import { EmployeeData } from "../Models/Employee"

export type GetEmployeesAction = { type: "GET_EMPLOYEES", payload: EmployeeData[] }

export const GetEmployees = (newEmployee: EmployeeData[]): GetEmployeesAction => ({
    type: "GET_EMPLOYEES",
    payload: newEmployee
})
export type AddEmployeeAction = { type: "ADD_EMPLOYEE", payload: EmployeeData }

export const AddEmployee = (newEmployee: EmployeeData): AddEmployeeAction => ({
    type: "ADD_EMPLOYEE",
    payload: newEmployee
})

export type EditEmployeeAction = { type: "EDIT_EMPLOYEE", payload: EmployeeData }

export const EditEmployee = (employeeId: EmployeeData): EditEmployeeAction => ({
    type: "EDIT_EMPLOYEE",
    payload: employeeId
})

export type RemoveEmployeeAction = { type: "REMOVE_EMPLOYEE", payload: EmployeeData["id"] }

export const RemoveEmployeeById = (employeeId: EmployeeData["id"]): RemoveEmployeeAction => ({
    type: "REMOVE_EMPLOYEE",
    payload: employeeId
})

export type EmployeeAction = (
    GetEmployeesAction |
    AddEmployeeAction |
    EditEmployeeAction |
    RemoveEmployeeAction
)
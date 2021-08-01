import axios from 'axios'
import { Dispatch } from "@reduxjs/toolkit"
import { AddEmployee, EditEmployee, GetEmployees, RemoveEmployeeById } from "../redux/actions"
import { EmployeeData, EmployeeDataDto } from "../Models/Employee"
import { getAxios } from './Axios'
import { useHistory } from 'react-router'

const axiosInstance = getAxios("employees")

export const GetAll_Employees = async (dispatch: Dispatch, token: string, handelError: () => void) => {
    try {
        const { data } = await axiosInstance.get("", { headers: { Authorization: `Bearer ${token}` } })

        dispatch(GetEmployees(data))
    } catch {
        console.log("client: Erorr while getting the employees from the server");

        handelError()
    }
}
export const AddNew_Employee = async (dispatch: Dispatch, newEmployee: EmployeeDataDto, token: string, handelError: () => void) => {
    try {
        const { data } = await axiosInstance.post("/", newEmployee, { headers: { Authorization: `Bearer ${token}` } })

        dispatch(AddEmployee(data))
    } catch {
        console.log("client: Erorr in adding employee");

        handelError()
    }
}
export const Edit_Employee = async (dispatch: Dispatch, employeeToEdit: EmployeeData, token: string, handelError: () => void) => {
    try {
        await axiosInstance.put(`/${employeeToEdit.id}`, { ...employeeToEdit }, { headers: { Authorization: `Bearer ${token}` } })

        dispatch(EditEmployee(employeeToEdit))
    } catch {
        console.log("client: Erorr while employee being edit");

        handelError()
    }
}
export const Remove_Employee = async (dispatch: Dispatch, employeeToRemove: EmployeeData, token: string, handelError: () => void) => {
    try {
        await axiosInstance.delete(`/${employeeToRemove.id}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch(RemoveEmployeeById(employeeToRemove.id))
    } catch {
        console.log("client: Erorr in removing employee");

        handelError()
    }
}

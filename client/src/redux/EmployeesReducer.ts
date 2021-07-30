import React from 'react';
import { EmployeeData } from '../Models/Employee';
import { AddEmployeeAction, EmployeeAction, RemoveEmployeeAction } from './actions';

export interface EmployeeState {
    employees: Array<EmployeeData>
}

const initialState: EmployeeState = {
    employees: []
}

export const EmployeesReducer = (state: EmployeeState = initialState, action: EmployeeAction) => {
    switch (action.type) {
        case "GET_EMPLOYEES": {
            // Update the all list of employees
            return { ...state, employees: action.payload }
        }
        case "ADD_EMPLOYEE": {
            // Add the new employee to the employees list
            return { ...state, employees: [...state.employees, action.payload] }
        }
        case "EDIT_EMPLOYEE": {
            for (let i = 0; i < state.employees.length; i++) {
                // Find the employee by id, and update it's new data
                if (state.employees[i].id === action.payload.id) {
                    state.employees[i] = action.payload

                    break;
                }
            }

            return { ...state, employees: [...state.employees] }
        }
        case "REMOVE_EMPLOYEE": {
            for (let i = 0; i < state.employees.length; i++) {
                // Find and remove the employee (by unique id) 
                if (state.employees[i].id === action.payload) {
                    state.employees.splice(i, 1)

                    break;
                }
            }

            return { ...state, employees: [...state.employees] }
        }
        default:
            return state
    }
}
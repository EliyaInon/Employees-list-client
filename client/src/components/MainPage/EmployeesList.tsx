import React, { useEffect, useState } from 'react';
import "./EmployeesList.css"
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeState } from '../../redux/EmployeesReducer';
import { GetAll_Employees } from '../../Services/Employees';
import { EmployeeLine } from './EmployeeLine';
import { AddEmployeeWindow } from './AddEmployeeWindow';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../../Services/Authentication';
import reactUseCookie from 'react-use-cookie';
import { useHistory } from 'react-router';
import { LOGIN_PATH } from '../../App';
import { EmployeeData } from '../../Models/Employee';

interface WindowContextData {
    isOpenWindow: boolean,
    setIsOpenWindow: (b: boolean) => void,
    editEmployee?: EmployeeData,
    setEditEmployee: (empToEdit: EmployeeData) => void,
}
export const WindowContext = React.createContext<WindowContextData>({
    isOpenWindow: false,
    setIsOpenWindow: (b: boolean) => { },
    setEditEmployee: (empToEdit: EmployeeData) => { }
})
export const EmployeesList = () => {
    //#region Hooks
    const employees =
        useSelector<EmployeeState, EmployeeState["employees"]>((state) => state.employees)
    const dispatch = useDispatch();

    const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState<boolean>(false)
    const [editEmployee, setEditEmployee] = useState<EmployeeData | undefined>(undefined)
    const [isManagerMode, setIsManagerMode] = useState<boolean>(false)

    const [token, setToken] = reactUseCookie('token')

    const history = useHistory()

    const { logout } = useAuth()

    useEffect(() => {
        if (token === "") {
            logout()
        }
    }, [token])

    useEffect(() => {
        GetAll_Employees(dispatch, token, () => { history.push(LOGIN_PATH) })
    }, [])

    useEffect(() => {
        // Open window when edit mode is set
        if (editEmployee != undefined) {
            setIsAddEmployeeOpen(true)
        }
    }, [editEmployee])
    useEffect(() => {
        // On close, reset the mode
        if (!isAddEmployeeOpen) {
            setEditEmployee(undefined)
        }
    }, [isAddEmployeeOpen])
    //#endregion

    return <WindowContext.Provider value={{
        isOpenWindow: isAddEmployeeOpen,
        setIsOpenWindow: setIsAddEmployeeOpen,
        editEmployee: editEmployee,
        setEditEmployee: setEditEmployee
    }}>
        {isAddEmployeeOpen && <AddEmployeeWindow editEmployee={editEmployee} />}
        <Button className="button-logout" type="submit" onClick={logout}>
            Log out
        </Button>
        <div className="employees-list-frame">
            <Container>
                <br />
                <Row style={{ margin: "auto" }}>
                    <Col>
                        <h3 style={{ display: 'inline' }}>
                            {`${isManagerMode ? "Managing " : ""}Employees`}
                        </h3>
                    </Col>
                    {isManagerMode && <Col>
                        <Button className="add-employees-button" onClick={e => { setIsAddEmployeeOpen(true) }}>
                            + Add Employee
                        </Button>
                    </Col>}
                    <Col>
                        <Button variant="link" className="change-mode-button"
                            onClick={e => { setIsManagerMode(!isManagerMode) }}>
                            {`${isManagerMode ? "< Visiter mode" : "Manager mode >"}`}
                        </Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md="auto">
                        <Table responsive="xl">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>
                                        First_Name
                                    </th>
                                    <th>
                                        Last_Name
                                    </th>
                                    <th>
                                        Phone_142141r124
                                    </th>
                                    <th>
                                        Address
                                    </th>
                                    <th>
                                        Roll
                                    </th>
                                    <th>
                                        Start Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => {
                                    return <EmployeeLine
                                        employeeData={emp}
                                        isManagerMode={isManagerMode}
                                    />
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    </WindowContext.Provider>
}
import React, { useContext } from 'react';
import "./EmployeeLine.css"
import { useDispatch } from 'react-redux';
import { Remove_Employee } from '../../Services/Employees';
import EditIcon from '../../Images/EditIcon.png'
import DeleteIcon from '../../Images/DeleteIcon.png'
import FaceIcon from '../../Images/FaceIcon.jpg'
import { WindowContext } from './EmployeesList';
import { EmployeeData, Roll } from '../../Models/Employee';
import reactUseCookie from 'react-use-cookie';
import { useAuth } from '../../Services/Authentication';

interface EmployeeLineProps {
    employeeData: EmployeeData
    isManagerMode: boolean
}

export const EmployeeLine = (props: EmployeeLineProps) => {
    const context = useContext(WindowContext);
    const dispatch = useDispatch();

    const [token, setToken] = reactUseCookie('token')

    const { logout } = useAuth();

    const dateFormat = (): string => {
        console.log(1)
        const date: Date = new Date(props.employeeData.startDate)
        console.log(2)
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('de-DE', { month: 'short' });
        const year = date.toLocaleString('default', { year: 'numeric' });

        console.log(`${day} ${month} ${year}`)
        return `${day} ${month} ${year}`
    }

    return <tr>
        <td>
            <img className="emp-picture" src={FaceIcon} />
        </td>
        <td className="td-feild">{props.employeeData.firstName}</td>
        <td className="td-feild">{props.employeeData.lastName}</td>
        <td className="td-feild">{props.employeeData.phoneNumber}</td>
        <td className="td-feild">{props.employeeData.address}</td>
        <td className="td-feild">{Roll[props.employeeData.roll]}</td>
        <td className="td-feild">{dateFormat()}</td>
        {props.isManagerMode && <td >
            <img className="row-icon" height="20px" src={EditIcon}
                onClick={e => { context.setEditEmployee(props.employeeData) }} />
        </td>
        }
        {props.isManagerMode && <td>
            <img className="row-icon" height="18px" src={DeleteIcon}
                onClick={e => { Remove_Employee(dispatch, props.employeeData, token, logout) }} />
        </td>
        }
    </tr>
}

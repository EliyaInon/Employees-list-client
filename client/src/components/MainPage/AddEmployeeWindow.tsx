import React, { SyntheticEvent, useContext, useMemo, useState } from 'react'
import "./AddEmployeeWindow.css"
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { EmployeeData, EmployeeDataDto, Roll } from '../../Models/Employee'
import reactUseCookie from 'react-use-cookie'
import { AddNew_Employee, Edit_Employee } from '../../Services/Employees'
import { WindowContext } from './EmployeesList'
import { InputField } from '../Reuseable/InputField'
import { SelectCombobox } from '../Reuseable/SelectCombobox'

interface AddEmployeeWindowProps {
    editEmployee?: EmployeeData
}

export const AddEmployeeWindow = (props: AddEmployeeWindowProps) => {
    const initDefaultValues = (): EmployeeDataDto => {
        let defaultFirstName: string = ""
        let defaultLastName: string = ""
        let defaultPhoneNumber: string = ""
        let defaultRoll: Roll = Roll.FullStack
        let defaultAddress: string = ""

        if (props.editEmployee != undefined) {
            defaultFirstName = props.editEmployee.firstName
            defaultLastName = props.editEmployee.lastName
            defaultPhoneNumber = props.editEmployee.phoneNumber
            defaultRoll = props.editEmployee.roll
            defaultAddress = props.editEmployee.address
        }

        return {
            firstName: defaultFirstName,
            lastName: defaultLastName,
            phoneNumber: defaultPhoneNumber,
            roll: defaultRoll,
            address: defaultAddress
        }
    }
    const defaultValues: EmployeeDataDto = useMemo(() => {
        return initDefaultValues()
    }, [])

    //#region Hooks
    const context = useContext(WindowContext);

    const [firstName, setFirstName] = useState<string>(defaultValues.firstName)
    const [lastName, setLastName] = useState<string>(defaultValues.lastName)
    const [phoneNumber, setPhoneNumber] = useState<string>(defaultValues.phoneNumber)
    const [roll, setRoll] = useState<Roll>(defaultValues.roll)
    const [address, setAddress] = useState<string>(defaultValues.address)

    const dispatch = useDispatch()

    const [token, setToken] = reactUseCookie('token')
    //#endregion

    //#region Functions
    const handelError = () => {
        console.log("Failed to get the employees from the server");
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        context.setIsOpenWindow(false);

        if (props.editEmployee != undefined) {
            Edit_Employee(
                dispatch,
                {
                    id: props.editEmployee.id,
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    roll: roll,
                    address: address,
                    startDate: props.editEmployee.startDate
                },
                token,
                handelError
            )
        } else {
            AddNew_Employee(
                dispatch,
                {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    roll: roll,
                    address: address
                },
                token,
                handelError
            )
        }
    }
    //#endregion

    var rollOptions: Array<string> = Object.keys(Roll).filter(x => isNaN(parseInt(x)));

    return (
        <div className="w-100 add-employee-window" >
            <Card>
                <div className="button-close"
                    onClick={e => { context.setIsOpenWindow(false) }}>
                    x
                </div>
                <Card.Body className="window-card-body">
                    <h5 className="text-right mb-4">
                        {`${props.editEmployee != undefined ? "Edit" : "Add"} Employee`}
                    </h5>
                    {/* {error && <Alert variant="danger">{error}</Alert>} */}
                    <Form onSubmit={submit}>
                        <Form.Group id="first-name">
                            <Form.Label />
                            <InputField bootstrapType="text"
                                value={firstName}
                                onChange={setFirstName}
                                placeholder="First Name" required />
                        </Form.Group>
                        <Form.Group id="last-name">
                            <Form.Label />
                            <InputField bootstrapType="text"
                                value={lastName}
                                onChange={setLastName}
                                placeholder="Last Name" required />
                        </Form.Group>
                        <Form.Group id="phoneNumber">
                            <Form.Label />
                            <InputField bootstrapType="tel"
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                                placeholder="phone" required />
                        </Form.Group>
                        <Form.Group id="roll">
                            <Form.Label />
                            <SelectCombobox
                                selectOptions={rollOptions}
                                placeholder={props.editEmployee != undefined ?
                                    Roll[props.editEmployee.roll].toString() : "roll"}
                                onChangeValue={val => { setRoll(rollOptions.indexOf(val)) }} />
                        </Form.Group>
                        <Form.Group id="address">
                            <Form.Label />
                            <InputField bootstrapType="text"
                                value={address}
                                onChange={setAddress}
                                placeholder="address" required />
                        </Form.Group>

                        <Button className="w-100 mt-3" type="submit" disabled={false}>
                            {props.editEmployee != undefined ? "Edit" : "Add"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}
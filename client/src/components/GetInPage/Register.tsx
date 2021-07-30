import React, { SyntheticEvent, useEffect, useState } from 'react'
import "./Register.css"
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { PasswordInput } from '../Reuseable/PasswordInput'
import { useAuth } from '../../Services/Authentication'
import { Link } from 'react-router-dom'
import { LOGIN_PATH } from '../../App'
import { InputField } from '../Reuseable/InputField'

export const Register = () => {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")

    const [seePassword, setSeePassword] = useState<boolean>(false)

    const { signup, error, setError } = useAuth();

    useEffect(() => {
        setError(undefined)
    }, [])

    const validate = (): boolean => {
        return password === passwordConfirm
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        if (validate()) {
            signup({ email: email, firstName: firstName, lastName: lastName }, password)
        } else {
            console.log("Some values are invalid");
        }
    }
    return (
        <div className="w-100 signup">
            <h3 className="text-center mb-4">
                Sign up
            </h3>
            <Card>
                <Card.Body className="signup-card-body">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={submit}>
                        <h5 className="mb-1">
                            Personal details
                        </h5>
                        <Form.Group id="first-name">
                            <Form.Label />
                            <InputField bootstrapType="text"
                                onChange={setFirstName}
                                placeholder="First Name" required />
                        </Form.Group>
                        <Form.Group id="last-name">
                            <Form.Label />
                            <InputField bootstrapType="text"
                                onChange={setLastName}
                                placeholder="Last Name" required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label />
                            <InputField bootstrapType="email"
                                onChange={setEmail}
                                placeholder="Email" required />
                        </Form.Group>
                        <h5 className="mb-1 mt-4">
                            Password
                        </h5>
                        <Form.Group id="password">
                            <Form.Label />
                            <PasswordInput placeholder="Password" onChange={setPassword}
                                setSeePasswordOnForm={setSeePassword} seePassword={seePassword}
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label />
                            <PasswordInput placeholder="Retypep Password" onChange={setPasswordConfirm}
                                setSeePasswordOnForm={setSeePassword} seePassword={seePassword}
                            />
                        </Form.Group>
                        <Form.Label />
                        <Button className="w-100 mt-3 signup-submit-button" type="submit" disabled={false}>
                            Sign up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Have an account? <Link to={LOGIN_PATH}> Sign in </Link>
            </div>
        </div>
    )
}

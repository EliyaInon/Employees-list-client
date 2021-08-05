import React, { SyntheticEvent, useEffect, useState } from 'react';
import './Login.css';
import { PasswordInput } from '../Reuseable/PasswordInput';
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../Services/Authentication';
import { REGISTER_PATH } from '../../App';
import { Link } from 'react-router-dom';
import { InputField } from '../Reuseable/InputField';

export const LogIn = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { signin, error, setError } = useAuth();

    useEffect(() => {
        setError(undefined)
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        signin(email, password)
    }
    
    return (
        <div className="w-100 signup">
            <h3 className="text-center mb-4">
                Sign in
            </h3>
            <Card>
                <Card.Body className="login-card-body">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={submit}>
                        <Form.Group id="email">
                            <Form.Label />
                            <InputField
                                bootstrapType="email"
                                placeholder="Email"
                                onChange={setEmail}
                                required
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label />
                            <PasswordInput placeholder="Password" onChange={setPassword} />
                        </Form.Group>
                        <Form.Label />
                        <Button className="w-100 mt-4 mb-4 signup-submit-button" type="submit" disabled={false}>
                            Sign in
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to={REGISTER_PATH}> Sign up </Link>
            </div>
        </div>
    )
}
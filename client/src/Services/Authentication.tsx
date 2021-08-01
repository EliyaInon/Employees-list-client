import axios from 'axios'
import React, { Children, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import reactUseCookie from 'react-use-cookie'
import { APP_PATH, LOGIN_PATH } from '../App'
import { UserData } from '../Models/Users'
import { getAxios } from './Axios'

interface ContextValue {
    user?: UserData,
    error?: string,
    setError: (newError?: string) => void,
    signup: (user: UserData, password: string) => void,
    signin: (email: string, password: string) => void,
    logout: () => void,
}

const AuthContext = React.createContext<ContextValue>({
    setError: () => { },
    signup: () => { },
    signin: () => { },
    logout: () => { }
})

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = (props: { children: any }) => {
    const [currUser, setCurrUser] = useState<UserData>()
    const [error, setError] = useState<string | undefined>()

    const [currToken, setCurrToken] = reactUseCookie('token', '');

    const history = useHistory();

    const axiosInstance = getAxios("Authentication")

    const signup = async (user: UserData, password: string) => {
        try {
            const { data } = await axiosInstance.post("/register",
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: password
                })
            setError(undefined)

            setCurrToken(data.token);
            setCurrUser(data.user);

            history.push(APP_PATH)
        } catch {
            setError(`the email ${user.email} is already exist`)
        }
    }

    const signin = async (email: string, password: string) => {
        try {
            const { data } = await axiosInstance.post("/login",
                {
                    email: email,
                    password: password
                })
            setError(undefined)

            setCurrToken(data.token);
            setCurrUser(data.user);

            history.push(APP_PATH)
        } catch {
            setError(`email or password is incorrect`)
        }
    }

    const logout = async () => {
        setCurrToken("")

        history.push(LOGIN_PATH)
    }

    const contextValue: ContextValue = {
        user: currUser,
        error: error,
        setError: setError,
        signup: signup,
        signin: signin,
        logout: logout
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

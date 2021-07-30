import React, { useEffect, useState } from 'react'
import "./PasswordInput.css"
import EyeIcon from '../../Images/Eye.png';
import NotEyeIcon from '../../Images/NotEye.png';
import { InputField } from './InputField';

interface PasswordInputProps {
    placeholder: string,
    onChange: (newPassword: string) => void,
    setSeePasswordOnForm?: (newState: boolean) => void,
    seePassword?: boolean,
}
export const PasswordInput = (props: PasswordInputProps) => {
    const [seePassword, setSeePassword] = useState<boolean>(props.seePassword ?? false);

    useEffect(() => {
        if (props.seePassword != undefined) {
            setSeePassword(props.seePassword)
        }
    }, [props.seePassword])

    useEffect(() => {
        if (props.setSeePasswordOnForm != undefined) {
            props.setSeePasswordOnForm(seePassword)
        }
    }, [seePassword])

    const inputType: "text" | "password" = seePassword ? "text" : "password"

    return (
        <>
            <InputField
                bootstrapType={inputType}
                onChange={newValue => props.onChange(newValue)}
                placeholder={props.placeholder}
                required
            />
            <img className="eye-icon" height="27px" width="24px" src={seePassword ? NotEyeIcon : EyeIcon}
                onClick={e => { setSeePassword(!seePassword) }} />
        </>
    )
}
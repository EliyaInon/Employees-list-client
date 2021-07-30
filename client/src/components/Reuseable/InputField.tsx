import React, { useState } from 'react'
import "./InputField.css"
import { Form, Alert } from 'react-bootstrap'

interface InputFieldProps {
    className?: string,
    bootstrapType: "text" | "password" | "datetime" | "datetime-local" | "date" | "month" |
    "time" | "week" | "number" | "email" | "url" | "search" | "tel" | "col",
    onChange: (value: string) => void,
    placeholder: string,
    value?: string,
    required?: boolean | undefined
    validation?: { validate: (value: string) => boolean, error: string }
}

export const InputField = (props: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.value ?? "")

    const handelChange = (newValue: string) => {
        props.onChange(newValue)
        setValue(newValue)
    }

    return (
        <>
            {(props.validation != undefined && !props.validation.validate(value)) &&
                <Alert variant="danger">{props.validation.error}</Alert>}
            <div className="input-title">
                {isFocused || value != "" ? props.placeholder : ""}
            </div>
            <Form.Control
                value={value}
                className={`input-field ${props.className}`}
                onFocus={e => { setIsFocused(true) }}
                onBlur={e => { setIsFocused(false) }}
                type={props.bootstrapType}
                onChange={e => handelChange(e.target.value)}
                placeholder={!isFocused ? props.placeholder : ""}
                required={props.required ?? false}
            />
        </>
    )
}
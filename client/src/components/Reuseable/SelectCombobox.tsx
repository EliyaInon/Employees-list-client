import React, { useEffect, useState } from 'react'
import "./InputField.css"
import Form from 'react-bootstrap/Form'
import { Roll } from '../../Models/Employee'

interface SelectComboboxProps {
    selectOptions: Array<string>
    onChangeValue: (value: string) => void
    placeholder: string
}

export const SelectCombobox = (props: SelectComboboxProps) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)

    return (
        <>
            <div className="input-title">
                {isSelected ? props.placeholder : ""}
            </div>
            <Form.Control as="select" className="input-field"
                onChange={e => { props.onChangeValue(e.target.value); setIsSelected(true) }}>
                <option defaultChecked={true} hidden>{props.placeholder}</option>
                {props.selectOptions.map(opt => (
                    <option
                        aria-selected="true"
                        key={opt}
                        value={opt}
                    >
                        {opt}
                    </option>
                ))
                }
            </Form.Control >
        </>
    )
}

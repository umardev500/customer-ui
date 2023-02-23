import React from 'react'

interface Props {
    title?: string
    disabled?: boolean
    required?: boolean
    name: string
    defaultChecked?: boolean
    checked?: boolean
    defaultValue?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const Radio = React.forwardRef(
    ({ name, title, disabled = false, required = false, checked = false, defaultChecked, defaultValue, onChange }: Props, ref?: React.LegacyRef<HTMLInputElement>) => {
        return (
            <div className="flex flex-1 bg-white whitespace-nowrap text-gray-500 items-center px-4 h-12 border rounded-lg">
                <input
                    ref={ref}
                    onChange={onChange}
                    type="radio"
                    defaultValue={defaultValue}
                    defaultChecked={defaultChecked}
                    checked={checked}
                    name={name}
                    disabled={disabled}
                    required={required}
                    className="w-4 h-4 bg-red-500 m-0 p-0"
                />
                <span className="ml-4">{title}</span>
            </div>
        )
    }
)

Radio.displayName = 'Radio'

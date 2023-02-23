import React from 'react'

interface Props {
    title?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
    className?: string
    type?: string
    defaultValue?: string
}

export const Input = React.forwardRef(
    ({ title, placeholder, disabled = false, required = false, className = '', type = 'text', defaultValue }: Props, ref?: React.LegacyRef<HTMLInputElement>) => {
        let disabledClasses = 'bg-gray-100'
        if (!disabled) disabledClasses = ''

        return (
            <div className={`flex-1 ${className}`}>
                <div className="flex whitespace-nowrap text-gray-500">
                    <span>{title}</span>
                    {required ? <span className="text-red-400">*</span> : null}
                </div>
                <input
                    ref={ref}
                    type={type}
                    disabled={disabled}
                    required={required}
                    defaultValue={defaultValue}
                    className={`${disabledClasses} border text-gray-500 outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 px-4 h-12 w-full mt-2 rounded-lg`}
                    placeholder={placeholder}
                />
            </div>
        )
    }
)

Input.displayName = 'Input'

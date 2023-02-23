import Link from 'next/link'
import React from 'react'

interface Props {
    right?: boolean
    className?: string
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const Dropdown: React.FC<Props> = ({ right, className, setState }) => {
    const handleClick = (): void => {
        setState(false)
    }

    className = className !== undefined ? className : ''
    const rightClass = right === true ? 'right-0' : ''

    return (
        <div className={`dropdown z-50 py-2 rounded absolute top-full bg-white border mt-1 shadow-lg ${rightClass} ${className}`}>
            <ul>
                <li>
                    <Link href={'/setting/account'} onClick={handleClick} className="flex roboto px-4 py-1.5 text-gray-500 hover:text-gray-600 cursor-pointer hover:bg-gray-50">
                        Pengaturan
                    </Link>
                </li>
            </ul>
        </div>
    )
}

import Link from 'next/link'
import React from 'react'

export const LeftNavbar: React.FC = () => {
    return (
        <ul className="navigation flex">
            <li>
                <Link href={'/'} className="navigation-link px-4 roboto text-gray-500 hover:text-gray-400 font-medium">
                    Home
                </Link>
            </li>
        </ul>
    )
}

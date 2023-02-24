import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { checkRouteClass } from '../../../helpers'

export const AccountHeadingNav: React.FC = () => {
    const router = useRouter()
    const pathName = router.pathname

    const basePath = '/settings/account'
    const defaultClasses = 'outline-none inline-flex items-center justify-center roboto font-medium hover:text-gray-600 px-4 h-10'

    const getClasses = (paths: string[]): string => {
        const mathedClasses =
            "text-gray-600 before:absolute before:content-[''] before:bg-slate-500 before:border-b-2 before:border-gray-500 before:flex before:left-0 before:right-0 before:bottom-0"

        return checkRouteClass(paths, pathName, mathedClasses, 'text-gray-500')
    }

    return (
        <ul className="flex gap-x-4 overflow-auto heading-nav">
            <li className="relative">
                <Link href="/settings/account/" className={`${defaultClasses} ${getClasses([basePath])}`}>
                    Overview
                </Link>
            </li>
            <li className="relative">
                <Link href="/settings/account/earning" className={`${defaultClasses} ${getClasses([`${basePath}/earning`])}`}>
                    Earnings
                </Link>
            </li>
            <li className="relative">
                <Link
                    href="/settings/account/profiles"
                    className={`${defaultClasses} ${getClasses([`${basePath}/profiles`, `${basePath}/profiles/address`, `${basePath}/profiles/authentication`])}`}
                >
                    Profiles
                </Link>
            </li>
        </ul>
    )
}

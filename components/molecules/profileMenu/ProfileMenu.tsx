import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { checkRouteClass } from '../../../helpers'

export const ProfileMenu: React.FC = () => {
    const router = useRouter()
    const pathName = router.pathname

    const getClasses = (paths: string[]): string => {
        return checkRouteClass(paths, pathName, 'border-l-slate-500 hover:border-l-slate-400', 'border-l-transparent')
    }

    return (
        <div className="profile-menu">
            <div className="py-5 bg-white rounded-lg">
                <Link
                    href={'/settings/account/profiles'}
                    className={`roboto whitespace-nowrap border-l-4 ${getClasses([
                        '/settings/account/profiles',
                    ])} py-3 flex items-center px-5 text-gray-500 hover:text-gray-400 font-medium`}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.59003 16.58L13.17 12L8.59003 7.41L10 6L16 12L10 18L8.59003 16.58Z" fill="currentColor" />
                    </svg>

                    <span className="ml-3">Profil Pengguna</span>
                </Link>
                <Link
                    href={'/settings/account/profiles/address'}
                    className={`roboto whitespace-nowrap border-l-4 ${getClasses([
                        '/settings/account/profiles/address',
                    ])} py-3 flex items-center px-5 text-gray-500 hover:text-gray-400 font-medium`}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.59003 16.58L13.17 12L8.59003 7.41L10 6L16 12L10 18L8.59003 16.58Z" fill="currentColor" />
                    </svg>

                    <span className="ml-3">Alamat</span>
                </Link>
                <Link
                    href={'/settings/account/profiles/authentication'}
                    className={`roboto whitespace-nowrap border-l-4 ${getClasses([
                        '/settings/account/profiles/authentication',
                    ])} py-3 flex items-center px-5 text-gray-500 hover:text-gray-400 font-medium`}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.59003 16.58L13.17 12L8.59003 7.41L10 6L16 12L10 18L8.59003 16.58Z" fill="currentColor" />
                    </svg>

                    <span className="ml-3">Autentikasi</span>
                </Link>
            </div>
        </div>
    )
}

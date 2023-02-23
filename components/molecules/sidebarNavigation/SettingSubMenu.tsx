import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
    className?: string
    shown?: boolean
}

export const SettingSubMenu = React.forwardRef(({ className = '', shown }: Props, ref: React.LegacyRef<HTMLUListElement>) => {
    const router = useRouter()
    const currPath = router.pathname

    return (
        <ul ref={ref} className={`sidebar-navigation sidebar-submenu ${shown === true ? 'shown' : ''} ${className}`} id="jo">
            <li>
                <Link
                    href={'/settings/account'}
                    className={`flex outline-none active px-4 items-center text-base my-1.5 ${currPath === '/setting/account' ? 'sub-active bg-gray-100' : ''}`}
                >
                    <div className="flex items-center flex-1">
                        <span
                            style={{
                                ['--icon' as any]: "url('/app/assets/icons/circle-outline.svg') no-repeat center",
                                ['--icon-active' as any]: "url('/app/assets/icons/circle-outline.svg') no-repeat center",
                            }}
                            className="icon inline-flex items-center justify-center mr-4"
                        ></span>
                        Akun
                    </div>
                </Link>
            </li>
        </ul>
    )
})

SettingSubMenu.displayName = 'SettingSubMenu'

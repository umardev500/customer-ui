import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'
import { checkPath } from '../../../helpers'
import { useSetSubMenuHeight } from '../../../hooks'
import { SettingSubMenu } from './SettingSubMenu'

const SidebarElement = (): any => {
    const settingItemRef = useRef<HTMLLIElement>(null)
    const settingSubMenuRef = useRef<HTMLUListElement>(null)

    const [settingSubShown, setSettingSubShown] = useState<boolean>(false)

    const router = useRouter()

    const getActiveClass = (path: string[]): string => {
        let className = ''
        path.forEach((val) => {
            if (checkPath(router, val)) {
                className = 'active'
            }
        })

        return className
    }

    const onDropdownClick = useCallback(
        (
            e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
            subMenuState: boolean,
            setSubMenuState: React.Dispatch<React.SetStateAction<boolean>>,
            theRef: React.RefObject<HTMLLIElement>
        ) => {
            e.preventDefault()
            setSubMenuState((prev) => !prev)

            if (!subMenuState) theRef.current?.classList.add('shown')
            if (subMenuState) theRef.current?.classList.remove('shown')
        },
        [settingSubShown]
    )

    useSetSubMenuHeight([settingSubMenuRef])

    return (
        <div className="sidebar-navigation-container px-2">
            <ul className="sidebar-navigation">
                <li className="overflow-hidden">
                    <Link className={`flex px-4 items-center text-base my-1.5 ${getActiveClass(['/'])}`} href="/">
                        <div className="flex items-center flex-1">
                            <span
                                style={{
                                    ['--icon' as any]: "url('/app/assets/icons/dashboard_icon.svg') no-repeat center",
                                    ['--icon-active' as any]: "url('/app/assets/icons/dashboard_icon_solid.svg') no-repeat center",
                                }}
                                className="icon inline-flex items-center justify-center mr-4"
                            ></span>
                            Dashboard
                        </div>
                    </Link>
                </li>
                <li className="overflow-hidden">
                    <Link className={`flex px-4 items-center text-base my-1.5 ${getActiveClass(['/products'])}`} href="/products">
                        <div className="flex items-center flex-1">
                            <span
                                style={{
                                    ['--icon' as any]: "url('/app/assets/icons/book.svg') no-repeat center",
                                    ['--icon-active' as any]: "url('/app/assets/icons/book-filled.svg') no-repeat center",
                                    ['--size' as any]: '24px',
                                }}
                                className="icon inline-flex items-center justify-center mr-4"
                            ></span>
                            Produk
                        </div>
                    </Link>
                </li>
                <li className="overflow-hidden">
                    <Link className={`flex px-4 items-center text-base my-1.5 ${getActiveClass(['/orders'])}`} href="/orders">
                        <div className="flex items-center flex-1">
                            <span
                                style={{
                                    ['--icon' as any]: "url('/app/assets/icons/task.svg') no-repeat center",
                                    ['--icon-active' as any]: "url('/app/assets/icons/task-solid.svg') no-repeat center",
                                    ['--size' as any]: '24px',
                                }}
                                className="icon inline-flex items-center justify-center mr-4"
                            ></span>
                            Pemesanan
                        </div>
                    </Link>
                </li>

                <li ref={settingItemRef} className="overflow-hidden">
                    <a
                        onClick={(e) => onDropdownClick(e, settingSubShown, setSettingSubShown, settingItemRef)}
                        className={`flex px-4 items-center text-base my-1.5 ${getActiveClass([
                            '/settings',
                            '/settings/account',
                            '/settings/account/earning',
                            '/settings/account/profiles',
                            '/settings/account/profiles/address',
                            '/settings/account/profiles/authentication',
                        ])}`}
                        href="#"
                    >
                        <div className="flex items-center flex-1">
                            <span
                                style={{
                                    ['--icon' as any]: "url('/app/assets/icons/settings.svg') no-repeat center",
                                    ['--icon-active' as any]: "url('/app/assets/icons/settings.svg') no-repeat center",
                                }}
                                className="icon inline-flex items-center justify-center mr-4"
                            ></span>
                            Pengaturan
                        </div>
                        <span
                            style={{ ['--icon' as any]: "url('/app/assets/icons/chevron-right.svg') no-repeat center" }}
                            className="arrow-icon inline-flex items-center justify-center"
                        ></span>
                    </a>
                    <SettingSubMenu ref={settingSubMenuRef} shown={settingSubShown} />
                </li>
            </ul>
        </div>
    )
}

export const SidebarNavigation = React.memo(SidebarElement)

import Image from 'next/image'
import React, { useContext, useRef, useState } from 'react'
import { AppContext, AppContextType } from '../../../contexts'
import { imgLoader } from '../../../helpers'
import { Dropdown } from '../dropdown'

export const RightNavbar: React.FC = () => {
    const [avatarMenu, setAvatarMenu] = useState<boolean>(false)
    const navRef = useRef<HTMLUListElement>(null)
    const ctx = useContext(AppContext) as AppContextType
    const userData = ctx.userData
    const avatar = userData?.detail.logo ?? 'avatar.png'

    const onDropdownToggle = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, setDropdownToggle: React.Dispatch<React.SetStateAction<boolean>>): void => {
        e.preventDefault()

        // open
        setDropdownToggle((prev) => !prev)
    }

    return (
        <ul className="navigation flex" ref={navRef}>
            <li className="flex relative">
                <a onClick={(e) => onDropdownToggle(e, setAvatarMenu)} className="navigation-link avatar-item flex items-center px-4" href="#">
                    <Image loader={imgLoader} src={avatar} width={36} height={36} className="object-cover w-9 h-9 object-top rounded-full" alt="avatar" quality={100} priority />
                </a>
                {avatarMenu ? <Dropdown setState={setAvatarMenu} right /> : null}
            </li>
        </ul>
    )
}

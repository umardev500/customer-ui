import Image from 'next/image'
import React from 'react'

export const SidebarBrand: React.FC = () => {
    return (
        <>
            <div className="brand-container flex items-center px-5">
                <Image src={'/app/assets/logos/logo.png'} width={50} height={50} quality={100} priority alt="logo" />
                <span className="brand-text ml-2.5">Admin.</span>
            </div>
        </>
    )
}

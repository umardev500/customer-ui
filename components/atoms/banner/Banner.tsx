import React from 'react'
import Image from 'next/image'

export const Banner: React.FC = () => {
    return (
        <div style={{ height: 250, width: '100%', position: 'relative' }}>
            <Image src={'/app/assets/banners/bg.jpg'} fill alt="banner" style={{ objectFit: 'cover' }} />
        </div>
    )
}

import React from 'react'
import Image from 'next/image'
import { Customer } from '../../../types'

interface Props {
    userData?: Customer
}

export const AccountHeadingInfo: React.FC<Props> = ({ userData }) => {
    const detail = userData?.detail
    const location = detail?.location

    return (
        <div className="flex justify-center flex-col lg:ml-6">
            <div className="flex justify-center lg:justify-start items-center text-base lg:text-lg xl:text-xl font-semibold text-gray-600">
                <span className="roboto">{detail?.name}</span>
                <Image className="ml-2.5" src={'/app/assets/icons/verify.png'} width={22} height={22} alt="icon" />
            </div>
            <span className="roboto text-center lg:text-left text-15 text-gray-500 mt-2">Member</span>
            <div className="roboto text-15 text-gray-500 mt-2 flex justify-center lg:justify-start items-center">
                <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_220_50)">
                        <path
                            d="M5.83333 0.666687C2.60833 0.666687 0 3.27502 0 6.50002C0 10.875 5.83333 17.3334 5.83333 17.3334C5.83333 17.3334 11.6667 10.875 11.6667 6.50002C11.6667 3.27502 9.05833 0.666687 5.83333 0.666687ZM1.66667 6.50002C1.66667 4.20002 3.53333 2.33335 5.83333 2.33335C8.13333 2.33335 10 4.20002 10 6.50002C10 8.90002 7.6 12.4917 5.83333 14.7334C4.1 12.5084 1.66667 8.87502 1.66667 6.50002Z"
                            fill="#6B7280"
                        />
                        <path
                            d="M5.83333 8.58335C6.98393 8.58335 7.91667 7.65061 7.91667 6.50002C7.91667 5.34943 6.98393 4.41669 5.83333 4.41669C4.68274 4.41669 3.75 5.34943 3.75 6.50002C3.75 7.65061 4.68274 8.58335 5.83333 8.58335Z"
                            fill="#6B7280"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_220_50">
                            <rect width="11.6667" height="16.6667" fill="white" transform="translate(0 0.666687)" />
                        </clipPath>
                    </defs>
                </svg>
                <span className="ml-2">
                    {location?.city}, {location?.province}, Indonesia
                </span>
            </div>
        </div>
    )
}

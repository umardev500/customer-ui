import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { AppContext, AppContextType } from '../../../contexts'

export const OverviewDetail: React.FC = () => {
    const ctx = React.useContext(AppContext) as AppContextType
    const userData = ctx.userData
    const detail = userData?.detail
    const location = detail?.location

    const router = useRouter()
    const gotoProfile = useCallback(() => {
        router.push('account/profiles').catch(() => {})
    }, [])

    return (
        <div className="bg-white rounded-xl px-6 py-5 detail">
            <span className="roboto font-medium text-lg text-gray-500">Details</span>
            <div className="flex justify-between items-center mt-4 border-b py-3 flex-wrap border-b-gray-100">
                <span className="roboto w-full lg:w-auto font-medium text-gray-500">Email</span>
                <span className="roboto text-gray-400 text-right">{detail?.email}</span>
            </div>
            <div className="flex justify-between items-center border-b py-3 flex-wrap border-b-gray-100">
                <span className="roboto w-full lg:w-auto font-medium text-gray-500">Username</span>
                <span className="roboto text-gray-400 text-right">{userData?.user}</span>
            </div>
            <div className="flex justify-between items-center border-b py-3 flex-wrap border-b-gray-100">
                <span className="roboto w-full lg:w-auto font-medium text-gray-500 whitespace-nowrap">Full Name</span>
                <span className="roboto mt-1 text-gray-400 text-right">{detail?.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 flex-wrap border-b-gray-100">
                <span className="roboto w-full lg:w-auto font-medium text-gray-500">Address</span>
                <span className="roboto mt-1 text-gray-400 text-center">
                    {location?.city}, {location?.province}, Indonesia
                </span>
            </div>
            <div className="mt-6">
                <button onClick={gotoProfile} className="flex h-11 items-center justify-center roboto font-medium bg-blue-100 px-4 py-1.5 rounded text-blue-500 w-full">
                    <span className="mr-2">See more</span>
                    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.7274 5.43582L19.2916 11L13.7274 16.5642M3.70825 11H19.1358"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

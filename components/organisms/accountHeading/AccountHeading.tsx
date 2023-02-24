import Image from 'next/image'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { AppContext, AppContextType } from '../../../contexts'
import { imgLoader, notify } from '../../../helpers'
import { BasicAPIResponse, modifyingResponse } from '../../../types'
import { AccountHeadingInfo, AccountHeadingNav } from '../../molecules'

const MEMBERSHIP_API = process.env.MEMBERSHIP_API as string

export const AccountHeading: React.FC = () => {
    const ctx = useContext(AppContext) as AppContextType
    const userData = ctx.userData
    const userId = userData?.customer_id
    const avatar = userData?.detail.logo ?? 'avatar.png'

    const [choosed, setChoosed] = useState<string | ArrayBuffer>('')
    const [file, setFile] = useState<File>()
    const inputFileRef = useRef<HTMLInputElement>(null)

    const handleAvatarChange = useCallback(() => {
        inputFileRef.current?.click()
    }, [])

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files !== null && files.length > 0) {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.result !== null) {
                    setChoosed(reader.result)
                    setFile(files[0])
                }
            }

            reader.readAsDataURL(files[0])
        }
    }, [])

    const fetchPost = async (): Promise<void> => {
        const target = `${MEMBERSHIP_API}/users/${userId ?? '000'}/avatar`
        if (file !== undefined) {
            const bodyContent = new FormData()
            bodyContent.append('file', file)

            try {
                const response = await fetch(target, {
                    method: 'PUT',
                    body: bodyContent,
                })

                const jsonData: modifyingResponse & BasicAPIResponse = await response.json()
                const isUpdated = jsonData.data.is_affected
                // if (isUpdated) notify.success('Data berhasil di update!', { className: 'roboto', position: 'bottom-right' })
                if (isUpdated) {
                    ctx.setReload((val) => val + 1)
                    setChoosed('')
                    setFile(undefined)
                    return await Promise.resolve()
                }
            } catch (err) {
                return await Promise.reject(err)
            }
        }
    }

    const handleApply = useCallback(() => {
        notify
            .promise(
                fetchPost(),
                {
                    loading: 'Mengupdate avatar',
                    success: 'Update avatar berhasil',
                    error: 'Something went wrong!',
                },
                {
                    className: 'roboto',
                    position: 'bottom-right',
                }
            )
            .catch(() => {})
    }, [file])

    return (
        <>
            <div className="mt-10 flex flex-col lg:flex-row justify-center lg:justify-start items-center">
                {choosed === '' ? (
                    <Image
                        loader={imgLoader}
                        src={avatar}
                        priority
                        className="border-3 border-white shadow-xl object-cover rounded-full w-28 h-28 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-36 xl:h-36 bg-red-100 mb-4 lg:mb-0"
                        width={144}
                        height={144}
                        alt="avatar"
                    />
                ) : (
                    <Image
                        src={choosed as string}
                        priority
                        className="border-3 border-white shadow-xl object-cover rounded-full w-28 h-28 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-36 xl:h-36 bg-red-100 mb-4 lg:mb-0"
                        width={144}
                        height={144}
                        alt="avatar"
                    />
                )}
                <AccountHeadingInfo userData={userData} />
            </div>
            <div className="mt-10 flex flex-wrap-reverse gap-4 items-start justify-center lg:justify-between">
                <AccountHeadingNav />
                <input className="absolute -z-10 top-0" onChange={handleFileChange} ref={inputFileRef} type="file" name="avatar" />
                <div className="flex">
                    <button
                        onClick={handleAvatarChange}
                        className="outline-none flex items-center roboto text-gray-500 hover:text-gray-600 bg-gray-200 hover:bg-gray-300 font-medium px-4 h-10 rounded-lg"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_220_67)">
                                <path
                                    d="M8.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V9.75"
                                    stroke="#4B5563"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.0299 2.26501L6.11991 8.17501C5.89491 8.40001 5.66991 8.84251 5.62491 9.16501L5.30241 11.4225C5.18241 12.24 5.75991 12.81 6.57741 12.6975L8.83491 12.375C9.14991 12.33 9.59241 12.105 9.82491 11.88L15.7349 5.97001C16.7549 4.95001 17.2349 3.76501 15.7349 2.26501C14.2349 0.765006 13.0499 1.24501 12.0299 2.26501Z"
                                    stroke="#4B5563"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.1826 3.11249C11.4313 3.99559 11.9026 4.80004 12.5513 5.44877C13.2001 6.09751 14.0045 6.56879 14.8876 6.81749"
                                    stroke="#4B5563"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_220_67">
                                    <rect width="18" height="18" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <span className="ml-2 whitespace-nowrap">Ganti logo</span>
                    </button>
                    {choosed !== '' ? (
                        <button
                            onClick={handleApply}
                            className="outline-none ml-2 flex items-center roboto text-white bg-blue-500 hover:bg-blue-600 font-medium px-4 h-10 rounded-lg"
                        >
                            <span className="whitespace-nowrap">Gunakan</span>
                        </button>
                    ) : null}
                </div>
            </div>
        </>
    )
}

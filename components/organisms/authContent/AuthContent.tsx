import { useRouter } from 'next/router'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { AppContext, AppContextType } from '../../../contexts'
import { checkInputValue, checkValuesChanged, notify } from '../../../helpers'
import { BasicAPIResponse, modifyingResponse, NewCreds } from '../../../types'
import { Input } from '../../atoms'

const MEMBERSHIP_API = process.env.MEMBERSHIP_API as string

export const AuthContent: React.FC = () => {
    const [pass, setPass] = useState<string>('')
    const [newPass, setNewPass] = useState<string>('')
    const passRef = useRef<HTMLInputElement>(null)
    const newPassRef = useRef<HTMLInputElement>(null)

    const router = useRouter()
    const handleBack = useCallback(() => {
        router.back()
    }, [])

    const ctx = useContext(AppContext) as AppContextType
    const userData = ctx.userData
    const userId = userData?.user_id
    const user = userData?.user ?? ''

    const fetchPost = async (pass: string, newPass: string): Promise<void> => {
        const target = `${MEMBERSHIP_API}/users/${userId ?? '000'}/creds`
        const creds: NewCreds = {
            user,
            pass: passRef.current?.value ?? '',
            new_pass: newPassRef.current?.value ?? '',
        }

        const reqBody = JSON.stringify(creds)

        try {
            const response = await fetch(target, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: reqBody,
            })

            const jsonData: modifyingResponse & BasicAPIResponse = await response.json()
            const isUpdated = jsonData.data.is_affected
            if (isUpdated) {
                setPass(pass)
                setNewPass(newPass)
                ctx.setReload((val) => val + 1)

                // reset value
                if (passRef.current != null) passRef.current.value = ''
                if (newPassRef.current != null) newPassRef.current.value = ''
                return await Promise.resolve()
            }

            if (!isUpdated) {
                return await Promise.reject(new Error('Data tidak terupdate'))
            }
        } catch (err) {
            return await Promise.reject(err)
        }
    }

    const handleSave = (): void => {
        const inputs = [passRef, newPassRef]
        const ok = checkInputValue(inputs)
        if (!ok) {
            notify.error('Yg bertanda bintang tidak boleh kosong!', { position: 'bottom-right', className: 'roboto' })
            return
        }

        const passValue = passRef.current?.value ?? ''
        const newPassValue = newPassRef.current?.value ?? ''

        const hasChanged = checkValuesChanged([
            [passValue, pass],
            [newPassValue, newPass],
        ])

        if (!hasChanged) {
            notify.error('Tidak ada perubahan untuk di update!', { className: 'roboto', position: 'bottom-right' })
            return
        }

        notify
            .promise(
                fetchPost(passValue, newPassValue),
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
    }

    return (
        <div className="mt-4 mb-4">
            <div className="flex flex-col lg:flex-row flex-wrap gap-4 mb-5">
                <Input ref={passRef} type="password" title="Password Lama" placeholder="Masukan password" required />
                <Input ref={newPassRef} title="Password Baru" placeholder="Password baru" required />
            </div>

            <div className="flex gap-2 mt-10 justify-end">
                <button onClick={handleBack} className="flex outline-none border items-center gap-2 hover:bg-gray-100 text-gray-500 px-4 py-1.5 rounded-lg">
                    <span>Kembali</span>
                </button>
                <button
                    onClick={handleSave}
                    className="flex outline-none border border-blue-500 items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg"
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_220_67)">
                            <path
                                d="M8.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V9.75"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12.0299 2.26501L6.11991 8.17501C5.89491 8.40001 5.66991 8.84251 5.62491 9.16501L5.30241 11.4225C5.18241 12.24 5.75991 12.81 6.57741 12.6975L8.83491 12.375C9.14991 12.33 9.59241 12.105 9.82491 11.88L15.7349 5.97001C16.7549 4.95001 17.2349 3.76501 15.7349 2.26501C14.2349 0.765006 13.0499 1.24501 12.0299 2.26501Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11.1826 3.11249C11.4313 3.99559 11.9026 4.80004 12.5513 5.44877C13.2001 6.09751 14.0045 6.56879 14.8876 6.81749"
                                stroke="currentColor"
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
                    <span>Simpan</span>
                </button>
            </div>
        </div>
    )
}

import React, { useEffect, useMemo, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { notify } from '../helpers'
import { Customer, CustomerResponse, PageProps } from '../types'

interface Props extends PageProps {
    children?: React.ReactNode
}

export interface AppContextType extends PageProps {
    shown: boolean
    setShown: React.Dispatch<React.SetStateAction<boolean>>
    userData?: Customer
    setReload: React.Dispatch<React.SetStateAction<number>>
}

export const AppContext = React.createContext({})

const CUSTOMER_API = process.env.CUSTOMER_API as string

export const AppProvider: React.FC<Props> = ({ children, ...pageProps }) => {
    const [shown, setShown] = useState(true)
    const [userData, setUserData] = useState<Customer>()
    const [reload, setReload] = useState<number>(0)
    const [loading, setLoading] = useState(true)

    const token: string = pageProps.token ?? ''

    const data = useMemo<AppContextType>(() => {
        return {
            shown,
            setShown,
            userData,
            setReload,
            token,
            ...pageProps,
        }
    }, [shown, userData])

    useEffect(() => {
        if (token !== '') {
            const fetchData = async (): Promise<void> => {
                const target = `${CUSTOMER_API}/me`

                try {
                    const response = await fetch(target, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    const jsonData: CustomerResponse = await response.json()
                    const isEmpty = jsonData.data.is_empty ?? false
                    if (!isEmpty) setUserData(jsonData.data.payload)

                    return await Promise.resolve()
                } catch (err) {
                    console.log(err)
                    return await Promise.reject(err)
                }
            }

            notify
                .promise(
                    fetchData(),
                    {
                        success: 'Loading user data selesai!',
                        error: 'Something wrong while loading user data',
                        loading: 'Loading user data...',
                    },
                    {
                        className: 'roboto',
                        position: 'bottom-right',
                    }
                )
                .catch(() => {})
        }
    }, [token, reload])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <AppContext.Provider value={data}>
            {!loading ? (
                <>
                    {children}
                    <Toaster />
                </>
            ) : null}
        </AppContext.Provider>
    )
}

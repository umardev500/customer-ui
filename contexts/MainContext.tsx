import React, { ReactNode, useMemo } from 'react'

export const MainContext = React.createContext({})

export interface MainContextType {
    userId: string
}

interface Props {
    children?: ReactNode
}

export const MainProvider: React.FC<Props> = ({ children }) => {
    const data = useMemo<MainContextType>(() => {
        return {
            userId: '0818912',
        }
    }, [])

    return <MainContext.Provider value={data}>{children}</MainContext.Provider>
}

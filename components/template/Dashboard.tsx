import { AnimatePresence } from 'framer-motion'
import React, { useContext, useEffect, useRef } from 'react'
import { AppContext, AppContextType } from '../../contexts'
import { Header, Sidebar } from '../organisms'

interface Props {
    children?: React.ReactNode
}

export const Dashboard: React.FC<Props> = ({ children }) => {
    const ctx = useContext(AppContext) as AppContextType
    const bodyRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // showing
        if (ctx.shown) {
            bodyRef.current?.classList.add('sidebar-shown')
        }

        // hidding
        if (!ctx.shown) {
            bodyRef.current?.classList.remove('sidebar-shown')
        }
    })

    return (
        <div ref={bodyRef} className="app-container">
            <Header />
            <Sidebar />
            <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
                <div className="content">{children}</div>
            </AnimatePresence>
        </div>
    )
}

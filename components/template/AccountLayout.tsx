import React from 'react'
import { AccountProvider } from '../../contexts'
import { AccountHeading } from '../organisms'

interface Props {
    children?: React.ReactNode
}
export const AccountLayout: React.FC<Props> = ({ children }): React.ReactElement => {
    return (
        <AccountProvider>
            <div className="no-padding pb-40">
                {/* <Banner /> */}
                <div className="account-content">
                    <AccountHeading />
                    {children}
                </div>
            </div>
        </AccountProvider>
    )
}

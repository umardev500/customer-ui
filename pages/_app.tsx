import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { AppProvider, MainProvider } from '../contexts'
import '../styles/app.scss'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout): React.ReactNode {
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <MainProvider>
            <AppProvider {...pageProps}>{getLayout(<Component {...pageProps} />)}</AppProvider>
        </MainProvider>
    )
}

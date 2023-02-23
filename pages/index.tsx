import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Dashboard } from '../components'
import { setCookie } from '../helpers'
import { PageProps } from '../types'
import { NextPageWithLayout } from './_app'

// const MEMBERSHIP_API = process.env.MEMBERSHIP_API as string

const Home: NextPageWithLayout = () => {
    // Fetch customer count
    useEffect(() => {}, [])

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
        </>
    )
}

Home.getLayout = (page: ReactElement) => {
    return <Dashboard>{page}</Dashboard>
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
    const cipherText = setCookie(ctx)
    const token = ctx.res.getHeader('token') as string

    return {
        props: {
            pageId: cipherText,
            token,
        },
    }
}

export default Home

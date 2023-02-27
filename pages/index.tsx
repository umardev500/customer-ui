import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Dashboard, FeaturedList } from '../components'
import { setCookie } from '../helpers'
import { useFeatured } from '../hooks/useFeatured'
import { PageProps } from '../types'
import { NextPageWithLayout } from './_app'

// const MEMBERSHIP_API = process.env.MEMBERSHIP_API as string

const Home: NextPageWithLayout = () => {
    // Fetch customer count
    const featuredValues = useFeatured()

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <FeaturedList contractLeft={featuredValues.left} ordersCount={featuredValues.orders} lastOrderCount={featuredValues.lastOrder} pendingCount={featuredValues.pending} />
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

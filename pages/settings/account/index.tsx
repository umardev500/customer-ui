import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import { AccountLayout, Dashboard, Overview } from '../../../components'
import { setCookie } from '../../../helpers'
import { PageProps } from '../../../types'
import { NextPageWithLayout } from '../../_app'

const Account: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Account</title>
            </Head>

            <div className="mt-10 flex flex-wrap flex-col lg:flex-row gap-5">
                <Overview />
            </div>
        </>
    )
}

Account.getLayout = (page: ReactElement) => {
    return (
        <Dashboard>
            <AccountLayout>{page}</AccountLayout>
        </Dashboard>
    )
}

export default Account

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

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'
import { AuthContent, Dashboard, ProfileLayout } from '../../../../components'
import { AccountLayout } from '../../../../components/template/AccountLayout'
import { setCookie } from '../../../../helpers'
import { PageProps } from '../../../../types'
import { NextPageWithLayout } from '../../../_app'

const Authentication: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Authentication</title>
            </Head>
            <AuthContent />
        </>
    )
}

Authentication.getLayout = (page: ReactElement) => {
    return (
        <Dashboard>
            <AccountLayout>
                <ProfileLayout title="Pengaturan autentikasi">{page}</ProfileLayout>
            </AccountLayout>
        </Dashboard>
    )
}

export default Authentication

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

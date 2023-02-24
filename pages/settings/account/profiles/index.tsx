import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'
import { Dashboard, AccountLayout, ProfileLayout } from '../../../../components'
import { setCookie } from '../../../../helpers'
import { PageProps } from '../../../../types'
import { NextPageWithLayout } from '../../../_app'

const Profiles: NextPageWithLayout = () => {
    return <></>
}

Profiles.getLayout = (page: ReactElement) => {
    return (
        <Dashboard>
            <AccountLayout>
                <ProfileLayout title="Pengaturan profil">{page}</ProfileLayout>
            </AccountLayout>
        </Dashboard>
    )
}
export default Profiles

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

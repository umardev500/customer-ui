import { GetServerSidePropsContext, PreviewData } from 'next'
import nookies from 'nookies'
import { ParsedUrlQuery } from 'querystring'
import { generateId } from './generateId'

export const setCookie = (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>): string => {
    let cipherText
    const cookies = nookies.get(ctx)
    if (cookies['page-id'] !== undefined) {
        cipherText = cookies['page-id']
    }
    if (cookies['page-id'] === undefined) {
        cipherText = generateId()
    }

    if (cookies['page-id'] === undefined && cipherText !== undefined) {
        nookies.set(ctx, 'page-id', cipherText, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        })
    }

    return cipherText as string
}

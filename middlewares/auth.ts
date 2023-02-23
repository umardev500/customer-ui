// import nookies from 'nookies'
import { jwtVerify } from 'jose'
import { NextRequest } from 'next/server'

export const auth = async (req: NextRequest): Promise<any> => {
    const tokenCookie = req.cookies.get('token')
    const token = tokenCookie?.value

    if (token === undefined) {
        const err = 'Unauthorized'
        return await Promise.reject(err)
    }

    const key = process.env.SECRET
    const secret = new TextEncoder().encode(key)
    try {
        await jwtVerify(token, secret)
        return await Promise.resolve(token)
    } catch (err) {
        return await Promise.reject(err)
    }
}

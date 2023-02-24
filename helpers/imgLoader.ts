import { ImageLoaderProps } from 'next/image'

const CUSTOMER_STATIC = process.env.CUSTOMER_STATIC as string

export const imgLoader = ({ src }: ImageLoaderProps): string => {
    const url = `${CUSTOMER_STATIC}${src}`
    return url
}

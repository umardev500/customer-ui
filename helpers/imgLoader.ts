import { ImageLoaderProps } from 'next/image'

const MEMBERSHIP_STATIC = process.env.MEMBERSHIP_STATIC as string

export const imgLoader = ({ src }: ImageLoaderProps): string => {
    const url = `${MEMBERSHIP_STATIC}/${src}`
    return url
}

import { useEffect, useState } from 'react'
import { getServerTime } from '../helpers'

export const useExpTime = (from: number): boolean => {
    const [isExp, setIsExp] = useState<boolean>(false)

    useEffect(() => {
        const calculate = async (): Promise<void> => {
            try {
                const unixTime = await getServerTime()
                if (from > 0) setIsExp(unixTime > from)

                return await Promise.resolve()
            } catch (err) {
                return await Promise.reject(err)
            }
        }

        calculate().catch(() => {})
    }, [])

    return isExp
}

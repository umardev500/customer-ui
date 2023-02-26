import { useEffect, useState } from 'react'
import { getServerTime } from '../helpers'

export const useExp = (setlement: number, dur: number): boolean => {
    const [isExp, setIsExp] = useState<boolean>(false)
    const sec = dur * 24 * 60 * 60
    const exp = setlement + sec

    useEffect(() => {
        const calculate = async (): Promise<void> => {
            try {
                const unixTime = await getServerTime()
                setIsExp(unixTime > exp)

                return await Promise.resolve()
            } catch (err) {
                return await Promise.reject(err)
            }
        }

        calculate().catch(() => {})
    }, [])

    return isExp
}

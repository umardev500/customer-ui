import { getServerTime } from '../helpers'

export const getExp = async (settlement: number, dur: number): Promise<boolean> => {
    const sec = dur * 24 * 60 * 60
    const exp = settlement + sec

    try {
        const unixTime = await getServerTime()
        if (settlement > 0) {
            return await Promise.resolve(unixTime > exp)
        }
        return await Promise.reject(new Error('error'))
    } catch (err) {
        return await Promise.reject(err)
    }
}

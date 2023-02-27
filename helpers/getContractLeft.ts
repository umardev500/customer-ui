import { getServerTime } from './syncServerTime'

export const getContractLeft = async (settlement: number, dur: number): Promise<number> => {
    const sec = dur * 24 * 60 * 60
    const exp = settlement + sec

    try {
        const unixTime = await getServerTime()
        let left = 0
        if (settlement > 0) {
            left = Math.round((exp - unixTime) / 60 / 60 / 24)
            if (left < 1) left = 0
        }
        return await Promise.resolve(left)
    } catch (err) {
        return await Promise.reject(err)
    }
}

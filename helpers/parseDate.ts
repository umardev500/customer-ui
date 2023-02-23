export const parseDate = (unixTime: number): string => {
    const date = new Date(unixTime * 1000)
    const d = date.toDateString()
    const dtStr = d.split(' ')
    const mDt = dtStr.slice(1, 3).join(' ')
    const y = dtStr.slice(3).join('')
    const dm = mDt + ', ' + y

    // const
    const t = date.toTimeString()
    const tStr = t.substring(0, 8)

    const dt = `${dm} ${tStr}`
    return dt
}

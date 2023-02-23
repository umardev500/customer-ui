const SERVER_TIME_API: string = process.env.SERVER_TIME_API as string

export const getServerTime = async (): Promise<any> => {
    try {
        const response = await fetch(`${SERVER_TIME_API}/get-time`)
        const time = await response.json()
        return time
    } catch (error) {
        console.error(error)
        return error
    }
}

export const getHeader = (headers: Array<[string, string]>, key: string): string[] => {
    const header = headers.filter((val) => val[0] === key)

    return header[0]
}

export const removeNoNum = (source: string): number => {
    const str = source.replace(/[a-zA-Z,.]+/gi, '')

    return parseInt(str)
}

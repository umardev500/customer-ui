export const removeParams = (params: string[], compares: string[]): string => {
    const newParams = params.filter((param) => {
        for (let i = 0; i < compares.length; i++) {
            if (param.includes(compares[i])) {
                return undefined
            }
        }

        return param
    })

    return newParams.join('&')
}

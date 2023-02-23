import { useCallback } from 'react'

export const useDebounce = (func: (val: string) => void, dur: number): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    let timeOut: string | number | NodeJS.Timeout | undefined

    const returnedFunc = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const later = (): void => {
            timeOut = undefined

            func(e.target.value)
        }

        clearTimeout(timeOut)

        timeOut = setTimeout(later, dur)
    }, [])

    return returnedFunc
}

import { SetStateAction, useEffect } from 'react'

export const useTimeoutSetState = (dur: number, stateToChange: SetStateAction<any>, to: any, deps: any[] = []): void => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            stateToChange(to)
        }, dur)

        return () => {
            clearTimeout(timeout)
        }
    }, deps)
}

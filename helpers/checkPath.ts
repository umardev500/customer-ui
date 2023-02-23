import { NextRouter } from 'next/router'

export const checkPath = (router: NextRouter, path: string): boolean => {
    const isMatch = router.pathname === path

    return isMatch
}

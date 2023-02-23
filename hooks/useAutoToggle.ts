import { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Props {
    router: NextRouter
    pathCompare: {
        basePath: string
        subPaths: string[]
    }
    setDropdownState: React.Dispatch<React.SetStateAction<boolean>>
    itemRef: React.RefObject<HTMLLIElement>
}

export const useAutoToggle = ({ router, pathCompare, setDropdownState, itemRef }: Props): boolean => {
    const [isHere, setIsHere] = useState<boolean>(false)

    useEffect(() => {
        const currentPath = router.pathname
        const res = pathCompare.subPaths.filter((val) => pathCompare.basePath + val === currentPath)
        if (res.length < 1) {
            setDropdownState(false)
            itemRef.current?.classList.remove('shown')
            setIsHere(false)
        }

        if (res.length > 0 || currentPath === pathCompare.basePath) {
            setDropdownState(true)
            itemRef.current?.classList.add('shown')
            setIsHere(true)
        }
    }, [router])

    return isHere
}

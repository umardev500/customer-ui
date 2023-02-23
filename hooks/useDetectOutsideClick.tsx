import React, { useEffect } from 'react'

interface Props {
    parent: React.RefObject<HTMLElement>
    target: React.RefObject<HTMLElement>
    setState: React.Dispatch<React.SetStateAction<boolean>>
    toActivate?: boolean
}

export const useDetectOutsideClick = ({ parent, target, setState, toActivate }: Props): void => {
    useEffect(() => {
        const handleClick = (e: MouseEvent): void => {
            const isInner = target.current?.contains(e.target as Node)
            if (toActivate === true && isInner === true) setState(true)

            if (isInner !== undefined && !isInner) {
                setState(false)
            }
        }

        const element = parent.current
        if (element !== undefined && element !== null) {
            element.addEventListener('click', handleClick)
        }

        return () => {
            if (element !== undefined && element !== null) element.removeEventListener('click', handleClick)
        }
    }, [])
}

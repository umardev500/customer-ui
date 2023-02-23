import { useEffect } from 'react'

interface Props {
    modal: React.RefObject<HTMLElement>
}

export const useModalShowEffect = ({ modal }: Props): void => {
    useEffect(() => {
        setTimeout(() => {
            modal.current?.classList.add('fade')
        }, 10)
    }, [])
}

interface Props {
    status: React.Dispatch<React.SetStateAction<boolean>>
}

export const useModalCloseHandler = ({ status }: Props) => {
    return () => {
        status(false)
    }
}

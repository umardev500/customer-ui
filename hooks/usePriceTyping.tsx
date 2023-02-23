import React, { useCallback } from 'react'
import { toCurrency } from '../helpers'

export const usePriceTyping = (): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.target.value.replace('Rp', '').replaceAll('.', ''))
        e.target.value = toCurrency(value, 'Rp')
    }, [])

    return handler
}

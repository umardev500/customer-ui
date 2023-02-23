import { useState, useEffect } from 'react'
import { IncomeResponse } from '../types'

const MEMBERSHIP_API = process.env.MEMBERSHIP_API as string

export const useEarning = (): number => {
    const [earning, setEarning] = useState(0)

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const target = `${MEMBERSHIP_API}/orders/income/sum`
            try {
                const response = await fetch(target)
                const jsonData: IncomeResponse = await response.json()
                const isEmpty = jsonData.data.is_empty ?? false
                if (!isEmpty) setEarning(jsonData.data.payload.total)
            } catch {}
        }

        fetchData().catch(() => {})
    }, [])

    return earning
}

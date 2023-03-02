import { useContext, useEffect, useState } from 'react'
import { AppContext, AppContextType } from '../contexts'
import { getContractLeft, getExp } from '../helpers'
import { FeaturedValue, OrderData, OrderResponse } from '../types'

const CUSTOMER_API = process.env.CUSTOMER_API as string

export const useFeatured = (): FeaturedValue => {
    const defaultValue: FeaturedValue = {
        left: '0',
        orders: '0',
        lastOrder: '0',
        pending: '0',
    }
    const [featuredValues, setFeaturedValues] = useState<FeaturedValue>(defaultValue)

    const ctx = useContext(AppContext) as AppContextType
    const token = ctx.token
    const isDeleted = ctx.userData?.deleted_at

    const fetchData = async (route: string): Promise<OrderData | undefined> => {
        // localhost:8000/membership/api/customers?status=none&count_only=true
        const target = `${CUSTOMER_API}${route}`
        try {
            const response = await fetch(target, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token ?? ''}`,
                },
            })
            const jsonData: OrderResponse = await response.json()

            if (jsonData.status_code !== 200) return await Promise.reject(jsonData.message)
            const isEmpty = jsonData.data.is_empty
            if (!isEmpty) {
                return await Promise.resolve(jsonData.data.payload)
            }
        } catch (err) {
            return await Promise.reject(err)
        }
    }

    useEffect(() => {
        const batchUpdate = async (): Promise<void> => {
            const featuredValueTemp: FeaturedValue = {
                left: '0',
                orders: '0',
                lastOrder: '0',
                pending: '0',
            }

            // get orders count
            try {
                const response = await fetchData('/orders?status=settlement&sort=desc')
                if (response !== undefined) {
                    const order = response?.orders[0]
                    const product = order.product
                    const settlementTime = order.settlement_time ?? 0
                    const dur = product.duration
                    const left = await getContractLeft(settlementTime, dur)

                    const row = left
                    featuredValueTemp.left = row.toString()
                }
            } catch (err) {
                console.log(err)
            }

            try {
                const response = await fetchData('/orders?status=settlement&count_only=true')
                const row = response?.rows ?? 0
                featuredValueTemp.orders = row.toString()
            } catch (err) {
                console.log(err)
            }

            // get pending count
            try {
                const response = await fetchData('/orders?status=pending&count_only=true')
                const row = response?.rows ?? 0
                featuredValueTemp.pending = row.toString()
            } catch (err) {
                console.log(err)
            }

            // get last order
            try {
                const response = await fetchData('/orders?status=settlement&sort=desc')
                if (response !== undefined) {
                    const order = response?.orders[0]
                    const settlementTime = order?.settlement_time ?? 0
                    const isExp = await getExp(settlementTime, order?.product.duration ?? 0)
                    if (!isExp) {
                        featuredValueTemp.lastOrder = '1'
                    }
                }
            } catch (err) {
                console.log(err)
            }

            setFeaturedValues(featuredValueTemp)
        }

        if (token !== '' && token !== undefined && isDeleted === undefined) {
            batchUpdate().catch(() => {})
        }
    }, [token])

    return featuredValues
}

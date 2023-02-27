import React from 'react'
import { Featured } from '../../molecules'

interface Props {
    contractLeft?: string
    ordersCount?: string
    lastOrderCount?: string
    pendingCount?: string
}

export const FeaturedList: React.FC<Props> = ({ contractLeft = '0', ordersCount = '0', lastOrderCount = '0', pendingCount = '0' }) => {
    return (
        <div className="flex flex-col flex-wrap lg:flex-row pt-5">
            <Featured icon="url('/app/assets/icons/book-filled.svg')" color="#6271EB" textName="Sisa Masa Aktif" textValue={contractLeft} />
            <Featured icon="url('/app/assets/icons/refresh.svg')" color="#FB923C" textName="Total Order" textValue={ordersCount} />
            <Featured icon="url('/app/assets/icons/receipt-filled.svg')" color="#3b82f6" textName="Order Berjalan" textValue={lastOrderCount} />
            <Featured icon="url('/app/assets/icons/task-featured.svg')" color="#DC3545" textName="Order Pending" textValue={pendingCount} />
        </div>
    )
}

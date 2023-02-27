import React from 'react'
import { Featured } from '../../molecules'

interface Props {
    customerCount?: string
    expiredCount?: string
    orderPendingCount?: string
    newMemberCount?: string
}

export const FeaturedList: React.FC<Props> = ({ customerCount = '0', expiredCount = '0', orderPendingCount = '0', newMemberCount = '0' }) => {
    return (
        <div className="flex flex-col flex-wrap lg:flex-row pt-5">
            <Featured icon="url('/app/assets/icons/book-filled.svg')" color="#6271EB" textName="Sisa Masa Aktif" textValue={customerCount} />
            <Featured icon="url('/app/assets/icons/refresh.svg')" color="#FB923C" textName="Total Order" textValue={expiredCount} />
            <Featured icon="url('/app/assets/icons/receipt-filled.svg')" color="#3b82f6" textName="Order Berjalan" textValue={newMemberCount} />
            <Featured icon="url('/app/assets/icons/task-featured.svg')" color="#DC3545" textName="Order Pending" textValue={orderPendingCount} />
        </div>
    )
}

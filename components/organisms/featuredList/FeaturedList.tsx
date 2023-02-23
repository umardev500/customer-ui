import React from 'react'
import { Featured } from '../../molecules'

interface Props {
    customerCount: number
    expiredCount: number
    orderPendingCount: number
    newMemberCount: number
}

export const FeaturedList: React.FC<Props> = ({ customerCount, expiredCount, orderPendingCount, newMemberCount }) => {
    return (
        <div className="flex flex-col flex-wrap lg:flex-row pt-5">
            <Featured icon="url('/app/assets/icons/book-filled.svg')" color="#6271EB" textName="Pelanggan" textValue={customerCount} />
            <Featured icon="url('/app/assets/icons/receipt-filled.svg')" color="#3b82f6" textName="Pendaftaran" textValue={newMemberCount} />
            <Featured icon="url('/app/assets/icons/refresh.svg')" color="#FB923C" textName="Kadaluwarsa" textValue={expiredCount} />
            <Featured icon="url('/app/assets/icons/task-featured.svg')" color="#DC3545" textName="Order Pending" textValue={orderPendingCount} />
        </div>
    )
}

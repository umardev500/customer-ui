import React from 'react'
import { Order } from '../../../types'
import { NoDataTable } from '../../atoms'
import { OrderListing } from '../../molecules'

interface Props {
    orderList: Order[]
}

export const OrderList = React.memo((props: Props) => {
    const { orderList } = props

    return (
        <div>
            <div className="bg-white overflow-auto rounded-lg border-l border-r border-b mb-5">
                <table className="min-w-full table table-nohover">
                    <thead>
                        <tr className="">
                            <th className="text-center border-r py-3 px-4 w-16 whitespace-nowrap">No.</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap w-60">Nomor Pesanan</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap w-60">Nama Pemesan</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap">Produk</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap">Harga Produk</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap">Tanggal Pemesanan</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap">Status</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap">Tindakan</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orderList.map((val, index) => (
                            <OrderListing index={index + 1} {...val} key={val.order_id} />
                        ))}

                        <NoDataTable list={orderList} />
                    </tbody>
                </table>
            </div>
        </div>
    )
})

OrderList.displayName = 'OrderList'

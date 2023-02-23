import React from 'react'
import { Product } from '../../../types'
import { NoDataTable } from '../../atoms'
import { ProductListing } from '../../molecules'

interface Props {
    productList: Product[]
}

export const ProductList = React.memo((props: Props) => {
    const { productList } = props
    // const [data] = useState([])

    return (
        <div>
            <div className="bg-white overflow-auto rounded-lg border-l border-r border-b mb-5">
                <table className="min-w-full table table-nohover">
                    <thead>
                        <tr className="">
                            <th className="text-center border-r py-3 px-4 w-16 whitespace-nowrap">No.</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap w-60">Nomor Produk</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap">Nama Produk</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap">Harga</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap">Durasi</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap">Dibuat Pada</th>
                            <th className="text-left border-r py-3 px-4 whitespace-nowrap">Tindakan</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productList.map((val, index) => (
                            <ProductListing index={index + 1} key={val.product_id} {...val} />
                        ))}

                        <NoDataTable list={productList} />
                    </tbody>
                </table>
            </div>
        </div>
    )
})

ProductList.displayName = 'ProductList'

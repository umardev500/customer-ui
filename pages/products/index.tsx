import { GetServerSideProps } from 'next'
import { ReactElement, useEffect, useState } from 'react'
import { Dashboard, ProductList } from '../../components'
import { TableDataInfo } from '../../components/molecules'
import { notify, setCookie } from '../../helpers'
import { PageProps, Product, ProductResponse } from '../../types'
import { NextPageWithLayout } from '../_app'

const CUSTOMER_API = process.env.CUSTOMER_API as string

const Products: NextPageWithLayout = ({ token }: PageProps) => {
    const [perPage] = useState<number>(10)
    const [total, setTotal] = useState<number>(0)
    const [rows, setRows] = useState<number>(0)
    const [productList, setProductList] = useState<Product[]>([])

    const fetchProducts = async (): Promise<void> => {
        const target = `${CUSTOMER_API}/products`
        try {
            const response = await fetch(target, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token ?? ''}`,
                },
            })
            const jsondData: ProductResponse = await response.json()
            const payload = jsondData.data.payload
            const isEmpty = jsondData.data.is_empty

            if (!isEmpty) {
                setProductList(payload.products)
                setTotal(payload.total)
                setRows(payload.rows)
            }
            if (isEmpty) {
                setProductList([])
                setTotal(0)
                setRows(0)
            }

            return await Promise.resolve()
        } catch (err) {
            return await Promise.reject(err)
        }
    }

    // Fetch product data
    useEffect(() => {
        notify
            .promise(
                fetchProducts(),
                {
                    loading: 'Loading data...',
                    success: 'Loading data berhasil!',
                    error: 'Something went wrong!',
                },
                {
                    className: 'roboto',
                    position: 'bottom-right',
                }
            )
            .catch(() => {})
    }, [])

    return (
        <>
            <div className="pt-4">
                <div className="bg-white pt-4 pb-2 px-10 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-500 mb-6 mt-2 roboto">Data Produk</h1>

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-2">
                        {/* <Search callback={searchHandler} title="Search" placeholder="Search" /> */}
                    </div>

                    <ProductList productList={productList} />
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <TableDataInfo total={total} perPage={perPage} rows={rows} />
                    </div>
                </div>
            </div>
        </>
    )
}

Products.getLayout = (page: ReactElement) => {
    return <Dashboard>{page}</Dashboard>
}

export default Products

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
    const cipherText = setCookie(ctx)
    const token = ctx.res.getHeader('token') as string

    return {
        props: {
            pageId: cipherText,
            token,
        },
    }
}

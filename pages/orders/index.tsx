import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { Dashboard, OrderList } from '../../components'
import { Search } from '../../components/atoms'
import { OrderFilterModal, TableDataInfo } from '../../components/molecules'
import { Pagination } from '../../components/molecules/pagination/Pagination'
import { notify, setCookie } from '../../helpers'
import { Order, OrderResponse, PageProps } from '../../types'
import { NextPageWithLayout } from '../_app'

const CUSTOMER_API = process.env.CUSTOMER_API as string
const DEFAULT_PER_PAGE = 10

const Orders: NextPageWithLayout = ({ token }: PageProps) => {
    const [pages, setPages] = useState<number>(0)
    const [perPage, setPerPage] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [rows, setRows] = useState<number>(0)
    const [keyword, setKeyword] = useState('')
    const [filterModalShown, setFilterModalShown] = useState(false)

    const searchHandler = useCallback((value: string) => {
        setKeyword(value)
    }, [])

    const filterHandler = useCallback((value: string) => {
        console.log(value)
    }, [])

    const router = useRouter()
    const params = router.query
    const PAGE = params.page as string
    const SORT = (params.sort as string) ?? 'desc'
    const STATUS = (params.status as string) ?? 'none'
    const [orderList, setOrderList] = useState<Order[]>([])

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            let target = `${CUSTOMER_API}/orders?per_page=${DEFAULT_PER_PAGE}&page=${PAGE}&sort=${SORT}&status=${STATUS}`
            if (keyword !== '') target += `&search=${keyword}`

            try {
                const response = await fetch(target, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token ?? ''}`,
                    },
                })
                const jsonData: OrderResponse = await response.json()

                if (jsonData.status_code !== 200) return await Promise.reject(jsonData.message)
                const payload = jsonData.data.payload
                const isEmpty = jsonData.data.is_empty
                if (!isEmpty) {
                    const orders = payload.orders
                    setOrderList(orders)
                    setPages(payload.pages)
                    setTotal(payload.total)
                    setRows(payload.rows)
                    setPerPage(payload.per_page ?? 0)
                }
                if (isEmpty) {
                    if (orderList.length > 0) setOrderList([])
                    if (pages !== 0) setPages(0)
                    if (total !== 0) setTotal(0)
                    if (rows !== 0) setRows(0)
                    if (perPage !== 0) setPerPage(0)
                }

                return await Promise.resolve()
            } catch (err) {
                return await Promise.reject(err)
            }
        }

        notify
            .promise(
                fetchData(),
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
    }, [PAGE, SORT, STATUS, keyword])

    return (
        <>
            <Head>
                <title>Pemesanan</title>
            </Head>

            <div className="pt-4">
                <div className="bg-white pt-4 pb-2 px-10 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-500 mb-6 mt-2 roboto">Data Pemesanan</h1>

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-5">
                        <button
                            onClick={() => setFilterModalShown(true)}
                            className="outline-none bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md font-medium roboto whitespace-nowrap mb-4 lg:mb-0 flex items-center justify-center lg:justify-start"
                        >
                            Filter tampilan
                        </button>
                        <Search callback={searchHandler} title="Search" placeholder="Search here..." />
                    </div>
                    <OrderList orderList={orderList} />
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <TableDataInfo total={total} perPage={perPage} rows={rows} />

                        <Pagination pageCount={pages} />
                    </div>
                </div>
            </div>

            {filterModalShown ? <OrderFilterModal saveCallback={filterHandler} modalSetState={setFilterModalShown} /> : null}
        </>
    )
}

Orders.getLayout = (page: ReactElement) => {
    return <Dashboard>{page}</Dashboard>
}

export default Orders

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

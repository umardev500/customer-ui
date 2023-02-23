import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import ReactPaginate from 'react-paginate'
import { removeParams } from '../../../helpers'

interface Props {
    pageCount: number
}

export const Pagination = React.memo(({ pageCount }: Props) => {
    const router = useRouter()
    let initialPage = parseInt(router.query.page as string)
    if (Number.isNaN(initialPage) || initialPage === undefined) initialPage = 0 // handle NaN or undefined

    const currentFullPath = router.asPath
    const currentParams = currentFullPath.split('?')[1] ?? ''

    const handlePageChange = useCallback(
        ({ selected }: { selected: number }) => {
            const params = currentParams.split('&')
            const newParams = removeParams(params, ['page'])
            let paths = newParams

            if (selected === 0) {
                if (paths.length > 0) {
                    paths = `?${paths}`
                }
                router.push(paths).catch((err) => console.log(err))
            } else {
                if (paths.length > 0) {
                    paths = `?page=${selected}&${paths}`
                } else {
                    paths = `?page=${selected}`
                }

                router.push(paths).catch((err) => console.log(err))
            }
        },
        [initialPage, currentParams]
    )

    return (
        <div className="py-5 flex lg:justify-end overflow-auto">
            <ReactPaginate
                onPageChange={handlePageChange}
                forcePage={initialPage}
                className="react-paginate"
                breakLabel="..."
                nextLabel="Next"
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={undefined}
                activeClassName="active"
            />
        </div>
    )
})

Pagination.displayName = 'Pagination'

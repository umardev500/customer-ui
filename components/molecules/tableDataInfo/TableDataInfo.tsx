import React from 'react'

interface Props {
    total: number
    perPage: number
    rows: number
}

export const TableDataInfo = React.memo(({ total, perPage, rows }: Props) => {
    return (
        <div className="flex flex-wrap">
            <span className="text-gray-500 roboto whitespace-nowrap mr-5 mb-1.5 lg:mb-0">Total: {total}</span>
            <span className="text-gray-500 roboto whitespace-nowrap mr-5 mb-1.5 lg:mb-0">Perpage: {perPage}</span>
            <span className="text-gray-500 roboto whitespace-nowrap mr-5 mb-1.5 lg:mb-0">Data size: {rows}</span>
        </div>
    )
})

TableDataInfo.displayName = 'TableDataInfo'

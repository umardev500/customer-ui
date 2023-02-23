import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { removeParams } from '../../../helpers'
import { useDetectOutsideClick, useModalCloseHandler, useModalShowEffect } from '../../../hooks'

interface Props {
    modalSetState: React.Dispatch<React.SetStateAction<boolean>>
    saveCallback: (sort: string, status: string) => void
}

const DEFAULT_STATUS = 'none'
const DEFAULT_SORT = 'asc'

export const OrderFilterModal: React.FC<Props> = ({ modalSetState, saveCallback }) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const modalInnerRef = useRef<HTMLDivElement>(null)
    const [sort, setsort] = useState<string>(DEFAULT_SORT)
    const [status, setStatus] = useState<string>(DEFAULT_STATUS)

    const router = useRouter()
    const currentFullPath = router.asPath
    const currentParams = currentFullPath.split('?')[1] ?? ''

    // modal effect
    useModalShowEffect({ modal: modalRef })

    // Detect outside modal click
    useDetectOutsideClick({ parent: modalRef, target: modalInnerRef, setState: modalSetState })

    // back handler
    const backHandler = useModalCloseHandler({ status: modalSetState })

    const handleSortSelect = (value: string): void => {
        setsort(value)
    }

    const handleStatusSelect = (value: string): void => {
        setStatus(value)
    }

    // Save handler
    const handleSave = (): void => {
        const params = currentParams !== '' ? currentParams.split('&') : []
        const newParams = removeParams(params, ['status', 'sort'])
        let paths = newParams

        // status
        if (status !== DEFAULT_STATUS) {
            paths += `&status=${status}`
        }

        // sorting
        if (sort !== DEFAULT_SORT) {
            paths += `&sort=${sort}`
        }

        // if (paths.length < 1) {
        //     console.log('less than 1')
        // }

        if (paths.length > 0) {
            // add question mark if not exist in first character of params
            if (paths[0] === '&') paths = '?' + paths.slice(1)
            if (paths[0] !== '?') paths = '?' + paths
        }

        if (paths.length > 0) router.push(paths).catch((err) => console.log(err))
        if (paths.length < 1 && params.length > 0) {
            router.push(router.pathname).catch((err) => console.log(err))
        }
    }

    return (
        <div className="modal pt-5 px-5" ref={modalRef}>
            <div style={{ width: 300 }} className="modal-inner bg-white rounded-lg" ref={modalInnerRef}>
                {/* header */}
                <div className="flex justify-between p-4 px-5">
                    <h3 className="roboto text-gray-500 font-medium text-base">Filter tampilan</h3>
                    <button onClick={backHandler} className="hover:text-gray-500 text-gray-400">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                {/* body */}
                <div className="px-7 pt-2 pb-2">
                    <div>
                        <span className="roboto font-medium text-gray-500 mb-2 flex">Order by:</span>
                        <div className="inline-flex items-center">
                            <input onChange={() => handleSortSelect('desc')} checked={sort === 'desc'} type="radio" value={'newest'} className="w-4 h-4" name="orderby" />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">Terbaru</span>
                        </div>
                        <div className="inline-flex items-center ml-5">
                            <input onChange={() => handleSortSelect('asc')} checked={sort === 'asc'} type="radio" value={'oldest'} className="w-4 h-4" name="orderby" />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">Terlama</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <span className="roboto font-medium text-gray-500 mb-2 flex">Status type:</span>
                        <div className="inline-flex items-center mr-5 mb-3">
                            <input onChange={() => handleStatusSelect('none')} checked={status === 'none'} type="radio" value={'all'} className="w-4 h-4" name="status" />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">None</span>
                        </div>
                        <div className="inline-flex items-center mr-5 mb-3">
                            <input onChange={() => handleStatusSelect('pending')} checked={status === 'pending'} type="radio" value={'all'} className="w-4 h-4" name="status" />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">Pending</span>
                        </div>
                        <div className="inline-flex items-center mr-5 mb-3">
                            <input
                                onChange={() => handleStatusSelect('settlement')}
                                checked={status === 'settlement'}
                                type="radio"
                                value={'all'}
                                className="w-4 h-4"
                                name="status"
                            />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">Lunas</span>
                        </div>
                        <div className="inline-flex items-center mr-5 mb-3">
                            <input onChange={() => handleStatusSelect('cancel')} checked={status === 'cancel'} type="radio" value={'all'} className="w-4 h-4" name="status" />
                            <span className="text-gray-400 font-medium roboto leading-none ml-2">Dibatalkan</span>
                        </div>
                    </div>
                </div>

                {/* footer */}
                <div className="px-5 py-4 flex justify-center flex-col">
                    <button onClick={handleSave} className={`roboto font-medium bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2 text-white`}>
                        Simpan
                    </button>
                    <button
                        onClick={backHandler}
                        className="roboto font-medium bg-white border border-gray-200 hover:border-gray-300 mt-1.5 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md px-3 py-2"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}

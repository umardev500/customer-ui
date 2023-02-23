import React, { useRef } from 'react'
import { parseDate, toCurrency } from '../../../helpers'
import { useDetectOutsideClick, useModalCloseHandler, useModalShowEffect } from '../../../hooks'
import { Product } from '../../../types'

interface Props extends Product {
    setModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProductDetailModal = React.memo(({ setModalState, ...props }: Props) => {
    const { product_id: productId, name, price, duration, description, created_at: createdTime, updated_at: updatedTime } = props
    const modalRef = useRef<HTMLDivElement>(null)
    const modalInnerRef = useRef<HTMLDivElement>(null)

    // console.log(bookCover)

    useModalShowEffect({ modal: modalRef })

    useDetectOutsideClick({ parent: modalRef, target: modalInnerRef, setState: setModalState })

    // back handler
    const backHandler = useModalCloseHandler({ status: setModalState })

    return (
        <>
            <div className="modal pt-5 px-5" ref={modalRef}>
                <div className="modal-inner bg-white rounded-lg" ref={modalInnerRef}>
                    {/* header */}

                    <div className="flex justify-between p-4 px-6">
                        <h3 className="text-gray-500 font-medium roboto">Informasi Produk</h3>
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
                    <div className="px-6 pb-5">
                        <div className="border-b mb-4">
                            <div className="mt-2">
                                <span className="text-xl text-gray-500 whitespace-normal roboto font-medium">{name}</span>
                            </div>
                            <div className="mt-2 mb-4 flex items-center">
                                {/* <span className="text-base font-semibold">Product ID:</span> */}
                                <span className="text-base text-gray-400 whitespace-normal roboto">{productId}</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-base font-medium roboto text-gray-500">Harga Produk:</span>
                            <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{toCurrency(price ?? 0, 'Rp')}</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-base font-medium roboto text-gray-500">Durasi:</span>
                            <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{duration} Hari</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-base font-medium roboto text-gray-500">Dibuat Pada:</span>
                            <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{parseDate(createdTime)}</span>
                        </div>

                        {updatedTime !== undefined ? (
                            <div className="mt-2">
                                <span className="text-base font-medium roboto text-gray-500">Diupdate Pada:</span>
                                <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{parseDate(updatedTime)}</span>
                            </div>
                        ) : null}

                        <div className="mt-4 pt-2.5 mb-2 border-t">
                            <span className="flex text-base font-medium roboto text-gray-500">Deskripsi:</span>
                            <span className="flex mt-1 text-base text-gray-400 whitespace-normal roboto">{description}</span>
                        </div>
                        <div className="text-right">
                            <button
                                onClick={backHandler}
                                className={`mt-4 roboto font-medium border border-gray-300 hover:border-gray-400 rounded-md px-4 py-2 text-gray-400 hover:text-gray-500`}
                            >
                                Kembali
                            </button>
                            <button
                                className={`mt-4 ml-2 roboto font-medium border border-blue-500 bg-blue-500 hover:border-blue-600 hover:bg-blue-600 rounded-md px-4 py-2 text-white`}
                            >
                                Pesan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

ProductDetailModal.displayName = 'ProductDetailModal'

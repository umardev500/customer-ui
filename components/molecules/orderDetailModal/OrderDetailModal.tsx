import React, { useRef } from 'react'
import { parseDate, toCurrency, toUpperFirst } from '../../../helpers'
import { useDetectOutsideClick, useModalCloseHandler, useModalShowEffect } from '../../../hooks'
import { Order } from '../../../types'

interface Props extends Order {
    setModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export const OrderDetailModal: React.FC<Props> = ({ setModalState, ...props }) => {
    const { order_id: orderId, buyer, product, status, created_at: createdTime, updated_at: updatedTime } = props
    const { name: buyerName } = buyer
    const { product_id: productId, name: productName, price: productPrice, duration, description } = product
    const { payment_type: paymentType, va_number: vaNumber, gross_amount: grossAmount, bank } = props.payment

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
                        <h3 className="text-gray-500 font-medium roboto">Informasi Pemesanan</h3>
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
                                <span className="text-xl text-gray-500 whitespace-normal roboto font-medium">{buyerName}</span>
                            </div>
                            <div className="mt-2 mb-4 flex items-center">
                                {/* <span className="text-base font-semibold">Product ID:</span> */}
                                <span className="text-base text-gray-400 whitespace-normal roboto">{orderId}</span>
                            </div>
                        </div>
                        <div className="border-b mb-4 pb-4">
                            <div className="mt-2">
                                <span className="text-base font-medium roboto text-gray-500">ID Transfer:</span>
                                <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{vaNumber}</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-base font-medium roboto text-gray-500">Pembayaran:</span>
                                <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{paymentType}</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-base font-medium roboto text-gray-500">Vendor:</span>
                                <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{bank.toUpperCase()}</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-base font-medium roboto text-gray-500">Jumlah:</span>
                                <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{toCurrency(grossAmount, 'Rp')}</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-base font-medium roboto text-gray-500">Produk:</span>
                            <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{productName}</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-base font-medium roboto text-gray-500">Nomor:</span>
                            <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{productId}</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-base font-medium roboto text-gray-500">Harga Produk:</span>
                            <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{toCurrency(productPrice, 'Rp')}</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-base font-medium roboto text-gray-500">Durasi:</span>
                            <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{duration} Hari</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-base font-medium roboto text-gray-500">Status:</span>
                            <span className={`text-base ml-2 text-gray-400 whitespace-normal roboto`}>{toUpperFirst(status)}</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-base font-medium roboto text-gray-500">Pemesanan:</span>
                            <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">{parseDate(createdTime)}</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-base font-medium roboto text-gray-500">Update Pada:</span>
                            <span className="text-base ml-2 text-gray-400 whitespace-normal roboto">
                                {(updatedTime !== undefined ? parseDate(updatedTime) : undefined) ?? 'not yet'}
                            </span>
                        </div>
                        <div className="mt-2 border-t pt-2.5 mb-2">
                            <span className="flex text-base font-medium roboto text-gray-500">Deskripsi:</span>
                            <span className="text-base font-normal text-gray-400 whitespace-normal roboto">{description}</span>
                        </div>
                        <div className="text-right">
                            <button
                                onClick={backHandler}
                                className={`mt-4 roboto font-medium border border-gray-300 hover:border-gray-400 rounded-md px-4 py-2 text-gray-400 hover:text-gray-500`}
                            >
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

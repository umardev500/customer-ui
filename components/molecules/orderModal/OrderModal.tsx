import React, { useRef, useState } from 'react'
import { useDetectOutsideClick, useModalCloseHandler, useModalShowEffect } from '../../../hooks'

interface Props {
    setModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export const OrderModal: React.FC<Props> = ({ setModalState, ...props }) => {
    const [bank, setBank] = useState('bri')

    const modalRef = useRef<HTMLDivElement>(null)
    const modalInnerRef = useRef<HTMLDivElement>(null)

    // console.log(bookCover)

    useModalShowEffect({ modal: modalRef })

    useDetectOutsideClick({ parent: modalRef, target: modalInnerRef, setState: setModalState })

    // back handler
    const backHandler = useModalCloseHandler({ status: setModalState })

    const handleChangeBank = (val: string): void => {
        setBank(val)
    }

    return (
        <>
            <div className="modal pt-5 px-5" ref={modalRef}>
                <div style={{ width: 300 }} className="modal-inner bg-white rounded-lg" ref={modalInnerRef}>
                    {/* header */}

                    <div className="flex justify-between p-4 px-6">
                        <h3 className="text-gray-500 font-medium roboto">Pilih pembayaran</h3>
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
                    <div className="px-6 pb-5 pt-4">
                        <div
                            onClick={() => handleChangeBank('permata')}
                            className={`${bank === 'permata' ? 'bg-blue-50 ring-2' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer mb-2 rounded-md py-2.5 px-4`}
                        >
                            <span>Permata Virtual account</span>
                        </div>
                        <div
                            onClick={() => handleChangeBank('bca')}
                            className={`${bank === 'bca' ? 'bg-blue-50 ring-2' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer mb-2 rounded-md py-2.5 px-4`}
                        >
                            <span>BCA Virtual account</span>
                        </div>
                        <div
                            onClick={() => handleChangeBank('bri')}
                            className={` ${bank === 'bri' ? 'bg-blue-50 ring-2' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer mb-2 rounded-md py-2.5 px-4`}
                        >
                            <span>BRI Virtual account</span>
                        </div>
                    </div>
                    <div className="px-5 pb-4 flex justify-center flex-col">
                        <button className={`bg-blue-600 hover:bg-blue-700 rounded-md px-3 py-2 text-white mb-1.5`}>Submit</button>
                        <button
                            onClick={backHandler}
                            className="bg-white border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-md px-3 py-2"
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

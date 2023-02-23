import React, { useRef } from 'react'
import { useDetectOutsideClick, useModalCloseHandler, useModalShowEffect } from '../../../hooks'

interface Props {
    loading: boolean
    status?: string
    modalSetState: React.Dispatch<React.SetStateAction<boolean>>
    confirmedCallback: (closer: () => void) => void
    text: string
}

export const ConfirmModal: React.FC<Props> = ({ loading, status, modalSetState, confirmedCallback, text }) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const modalInnerRef = useRef<HTMLDivElement>(null)

    useModalShowEffect({ modal: modalRef })

    useDetectOutsideClick({ parent: modalRef, target: modalInnerRef, setState: modalSetState })

    const modalCloser = useModalCloseHandler({ status: modalSetState })

    const backHandler = (): void => {
        modalCloser()
    }

    const confirmedHandler = (): void => {
        confirmedCallback(modalCloser)
    }

    return (
        <div className="modal pt-20 px-5" ref={modalRef}>
            <div style={{ width: 330 }} className="modal-inner bg-white rounded-lg" ref={modalInnerRef}>
                {/* header */}
                <div className="flex justify-between p-4">
                    <h3></h3>
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
                <div className={`px-7 flex ${!loading && status === '' ? 'items-center' : ''} flex-col pb-4`}>
                    <svg
                        aria-hidden="true"
                        className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>

                    <h3 className="text-center text-lg whitespace-normal text-gray-500 roboto font-normal">{text}</h3>
                    <div className="mt-8 mb-4 flex flex-col w-full">
                        <button
                            onClick={confirmedHandler}
                            className="bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-md text-center font-medium whitespace-nowrap text-white roboto"
                        >
                            Ya, Saya setuju
                        </button>
                        <button
                            onClick={backHandler}
                            className="mt-2 bg-white hover:bg-gray-100 px-5 py-2.5 border border-gray-200 font-medium rounded-md text-center whitespace-nowrap text-gray-500  roboto"
                        >
                            Batalkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

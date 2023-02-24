import React, { useState } from 'react'
import { parseDate, toCurrency } from '../../../helpers'
import { Product } from '../../../types'
import { ProductDetailModal } from '../productDetailModal'

interface Props extends Product {
    index: number
}

export const ProductListing: React.FC<Props> = ({ index, ...props }) => {
    const { product_id: productId, name, price, duration, created_at: createdAt } = props
    const [detailModal, setDetailModal] = useState(false)

    return (
        <tr>
            <td className="px-4 border-r border-b border-slate-200 py-2 text-center">{index}.</td>
            <td className="px-4 border-r border-b border-slate-200 py-2">
                <span className="cursor-pointer hover:text-gray-400" onClick={() => setDetailModal(true)}>
                    {productId}
                </span>
            </td>
            <td className="px-4 border-r border-b border-slate-200 py-2 whitespace-nowrap">{name}</td>
            <td className="px-4 border-r border-b border-slate-200 py-2 whitespace-nowrap">{toCurrency(price ?? 0, 'Rp')}</td>
            <td className="px-4 border-r border-b border-slate-200 py-2 whitespace-nowrap">{duration} Hari</td>
            <td className="px-4 border-r border-b border-slate-200 py-2 whitespace-nowrap">{parseDate(createdAt)}</td>
            <td className="px-4 border-r border-b border-slate-200 py-2 whitespace-nowrap w-10">
                <div className="flex items-center">
                    <button
                        onClick={() => {
                            setDetailModal(true)
                        }}
                        className="bg-yellow-600 hover:bg-yellow-700 px-1.5 py-1.5 rounded-lg text-gray-100"
                    >
                        <svg width="22" height="22" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.3646 8.76874C18.1508 5.28999 14.9117 3.28708 11.5 3.28708C9.79416 3.28708 8.13624 3.78541 6.62207 4.715C5.10791 5.65416 3.74707 7.02458 2.63541 8.76874C1.67707 10.2733 1.67707 12.7171 2.63541 14.2217C4.84916 17.71 8.08832 19.7033 11.5 19.7033C13.2058 19.7033 14.8637 19.205 16.3779 18.2754C17.8921 17.3362 19.2529 15.9658 20.3646 14.2217C21.3229 12.7267 21.3229 10.2733 20.3646 8.76874V8.76874ZM11.5 15.3717C9.35332 15.3717 7.62832 13.6371 7.62832 11.5C7.62832 9.36291 9.35332 7.62833 11.5 7.62833C13.6467 7.62833 15.3717 9.36291 15.3717 11.5C15.3717 13.6371 13.6467 15.3717 11.5 15.3717Z"
                                fill="currentColor"
                            />
                            <path
                                d="M11.4981 8.75916C10.7725 8.75916 10.0765 9.04742 9.56342 9.56052C9.05032 10.0736 8.76205 10.7696 8.76205 11.4952C8.76205 12.2208 9.05032 12.9168 9.56342 13.4299C10.0765 13.943 10.7725 14.2312 11.4981 14.2312C13.0027 14.2312 14.2389 13.0046 14.2389 11.5C14.2389 9.9954 13.0027 8.75916 11.4981 8.75916V8.75916Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <div className="inline-flex ml-1.5 border-l border-gray-300 h-5"></div>
                    <button className="flex outline-none ml-1.5 bg-green-600 hover:bg-green-700 px-1.5 py-1.5 rounded-lg text-white">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12H18M12 18V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                {detailModal ? <ProductDetailModal {...props} setModalState={setDetailModal} /> : null}
            </td>
        </tr>
    )
}

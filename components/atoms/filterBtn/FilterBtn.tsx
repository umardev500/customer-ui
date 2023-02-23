import React from 'react'

interface Props {
    text: string
    onClick: () => void
}

export const FilterBtn: React.FC<Props> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="outline-none bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-md font-medium roboto whitespace-nowrap mb-4 lg:mb-0 flex items-center justify-center lg:justify-start"
        >
            <svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M19.7417 3.93107V6.0394C19.7417 6.80607 19.2625 7.7644 18.7833 8.24357L14.6625 11.8852C14.0875 12.3644 13.7042 13.3227 13.7042 14.0894V18.2102C13.7042 18.7852 13.3208 19.5519 12.8417 19.8394L11.5 20.7019C10.2542 21.4686 8.52916 20.6061 8.52916 19.0727V13.9936C8.52916 13.3227 8.14583 12.4602 7.7625 11.9811L7.31208 11.5115C7.16514 11.3574 7.07398 11.1586 7.05314 10.9467C7.0323 10.7348 7.08297 10.5221 7.19708 10.3423L12.1037 2.46482C12.2762 2.1869 12.5829 2.0144 12.9183 2.0144H17.825C18.8792 2.0144 19.7417 2.8769 19.7417 3.93107V3.93107ZM9.91875 3.48065L6.51666 8.93357C6.19083 9.46065 5.44333 9.53732 5.01208 9.0869L4.12083 8.14774C3.64166 7.66857 3.25833 6.80607 3.25833 6.23107V4.0269C3.25833 2.8769 4.12083 2.0144 5.175 2.0144H9.10416C9.85166 2.0144 10.3117 2.83857 9.91875 3.48065V3.48065Z"
                    fill="white"
                />
            </svg>
            <span className="ml-1.5">{text}</span>
        </button>
    )
}

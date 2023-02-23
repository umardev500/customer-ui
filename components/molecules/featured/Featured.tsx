import React from 'react'

interface Props {
    textName: string
    textValue: number
    color: string
    icon: string
}

export const Featured: React.FC<Props> = ({ textName, textValue, color, icon }) => {
    return (
        <div className="featured mr-4 mb-4 flex-1 bg-white flex items-center p-4 lg:p-5">
            <div style={{ ['--icon' as string]: icon, ['--color' as string]: color }} className="icon-box mr-4"></div>
            <div className="flex flex-col whitespace-nowrap">
                <span className="featured-name text-lg text-gray-500 font-medium">{textName}</span>
                <span className="featured-value text-gray-500 text-xl font-semibold whitespace-nowrap text-ellipsis roboto">{textValue}</span>
            </div>
        </div>
    )
}

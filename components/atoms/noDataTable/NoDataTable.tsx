interface Props {
    list: any[]
}

export const NoDataTable: React.FC<Props> = ({ list }) => {
    if (list.length < 1) {
        return (
            <tr>
                <td className="px-4 border-r border-b border-slate-200 py-2.5" colSpan={9}>
                    No data
                </td>
            </tr>
        )
    }

    return null
}

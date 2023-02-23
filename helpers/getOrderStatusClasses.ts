export const getOrderStatusClasses = (status: string): string => {
    console.log('ok render here is')
    if (status === 'pending') return 'text-gray-400'
    if (status === 'cancel') return 'text-amber-400'
    if (status === 'settlement') return 'text-gray-400'

    return ''
}

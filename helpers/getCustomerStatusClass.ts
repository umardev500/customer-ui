export const getCustomerStatusClass = (status: string, expiredTime?: boolean): string => {
    if ((expiredTime !== undefined && expiredTime) || status === 'expired') return 'bg-amber-400'
    if (status === 'pending') return 'text-gray-400'
    if (status === 'active') return 'text-green-500'

    return ''
}

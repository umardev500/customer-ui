export interface VaNumber {
    bank: string
    va_number: string
}

export interface BankTransferTransaction {
    data: {
        status_code: string
        status_message: string
        transaction_id: string
        order_id: string
        gross_amount: string
        payment_type: string
        transaction_time: string
        transaction_status: string
        fraud_status: string
        currency: string
        va_numbers: VaNumber[]
        merchant_id: string
    }
}

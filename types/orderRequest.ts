export interface OrderRequest {
    product_id: string
    payment: {
        payment_type: string
        bank_transfer: {
            bank: string
        }
    }
}

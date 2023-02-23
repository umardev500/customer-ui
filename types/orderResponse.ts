export interface OrderUser {
    customer_id: string
    name: string
    user: string
}

export interface OrderProduct {
    product_id: string
    name: string
    price: number
    duration: number
    description: string
}

export interface OrderPayment {
    payment_type: string
    order_id: string
    bank: string
    va_number: string
    gross_amount: number
}

export interface Order {
    order_id: string
    buyer: OrderUser
    product: OrderProduct
    payment: OrderPayment
    status: string
    created_at: number
    updated_at?: number
}

export interface OrderData {
    orders: Order[]
    rows: number
    pages: number
    per_page: number
    active_page: number
    total: number
}

export interface OrderResponse {
    status_code: number
    message: string
    data: {
        is_empty: boolean
        payload: OrderData
    }
}

export interface Product {
    product_id: string
    name: string
    price?: number
    duration: number
    description: string
    created_at: number
    updated_at: number
}

export interface ProductData {
    products: Product[]
    rows: number
    pages: number
    per_page: number
    active_page: number
    total: number
}

export interface ProductResponse {
    status_code: number
    message: string
    data: {
        is_empty: boolean
        payload: ProductData
    }
}

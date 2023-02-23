export interface CustomerLocation {
    address: string
    village: string
    district: string
    city: string
    province: string
    postal_code: string
}

export interface CustomerDetail {
    npsn: string
    name: string
    email: string
    wa: string
    type: string
    level: string
    about: string
    logo: string
    location: CustomerLocation
}

export interface Customer {
    customer_id: string
    user: string
    pass: string
    detail: CustomerDetail
    status: 'active' | 'expired' | 'pending'
    exp_until: number
    created_at: number
    updated_at: number
    deleted_at: number
}

export interface CustomerData {
    is_empty: boolean
    payload: Customer
}

export interface CustomerResponse {
    status_code: number
    message: string
    data: CustomerData
}

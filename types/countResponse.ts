export interface CountResponse {
    status_code: number
    message: string
    data: {
        is_empty: boolean
        payload: {
            rows: number
        }
    }
}

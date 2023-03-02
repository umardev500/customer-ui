export interface errType {
    code: string
    message: string
}

const orderMessage: errType[] = [
    {
        code: 'o01',
        message: 'Selesaikan pesanan sebelumnya',
    },
]

const userMessage: errType[] = [
    {
        code: 'u00',
        message: 'Pengguna tidak ditemukan',
    },
    {
        code: 'u01',
        message: 'Pengguna telah di hapus',
    },
]

const rentMessage: errType[] = [
    {
        code: 'r01',
        message: 'Kontrak masih aktif',
    },
]

export const errMessages: errType[] = [...orderMessage, ...userMessage, ...rentMessage]

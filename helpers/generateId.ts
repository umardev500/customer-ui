import nodeCrypto from 'crypto'

export const generateId = (): string => {
    const BLOCK_SIZE = parseInt(process.env.BLOCK_SIZE as string)
    const ALGORITHM = process.env.ALGORITHM as string
    const CIPHER_KEY = process.env.CIPHER_KEY as string

    const encrypt = (plainText: string): string => {
        const iv = nodeCrypto.randomBytes(BLOCK_SIZE)
        const chiper = nodeCrypto.createCipheriv(ALGORITHM, CIPHER_KEY, iv)
        let cipherText = chiper.update(plainText, 'utf-8', 'hex')
        cipherText += chiper.final('hex')
        cipherText = iv.toString('hex') + cipherText
        return cipherText
    }

    const userId = nodeCrypto.randomBytes(4).toString('hex')
    const cipherText = encrypt(userId)
    return cipherText
}

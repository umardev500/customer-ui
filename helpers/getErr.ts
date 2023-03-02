import { errMessages } from '../types'

export const getErr = (err: TypeError): Error => {
    const code = err.message

    const theErr = errMessages.filter((val) => val.code === code)
    if (theErr.length > 0) {
        return new Error(theErr[0].message)
    }

    return new Error('Something went wrong!')
}

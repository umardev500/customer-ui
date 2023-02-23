import React from 'react'

export const checkInputValue = (inputs: Array<React.RefObject<HTMLInputElement>>): boolean => {
    let ok = true
    for (let i = 0; i < inputs.length; i++) {
        const val = inputs[i].current?.value
        if (val === '') {
            ok = false
            break
        }
    }
    return ok
}

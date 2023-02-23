export const checkValuesChanged = (inputs: Array<[string, string]>): boolean => {
    let ok = false

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i]
        if (input[0] !== input[1]) {
            ok = true
            break
        }
    }

    return ok
}

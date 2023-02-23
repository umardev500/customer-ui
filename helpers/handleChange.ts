import React from 'react'

export const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState: React.Dispatch<React.SetStateAction<string>>): void => {
    setState(e.target.value)
}

// components/Layout/index.js

import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export const FramerLayout: React.FC<Props> = ({ children }) => (
    <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
        }}
    >
        {children}
    </motion.div>
)

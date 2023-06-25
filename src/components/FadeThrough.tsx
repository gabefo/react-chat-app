import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FadeThroughProps {
  children: ReactNode
}

export default function FadeThrough({ children }: FadeThroughProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { ease: [0, 0, 0.2, 1], duration: 0.21, delay: 0.09 },
      }}
      exit={{ opacity: 0, transition: { ease: [0.4, 0, 0.6, 1], duration: 0.09 } }}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  )
}

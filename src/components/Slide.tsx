import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { AnimatePresence, motion } from 'framer-motion'

interface SlideProps {
  children: ReactNode
  in: boolean
}

export default function Slide({ children, in: inProp }: SlideProps) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      {inProp && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0, transition: { ease: [0, 0, 0.2, 1], duration: 0.225 } }}
          exit={{ opacity: 0, y: 120, transition: { ease: [0.4, 0, 0.6, 1], duration: 0.195 } }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            inset: 0,
            pt: { md: 2 },
            bgcolor: 'background.paper',
            zIndex: 2,
          }}
        >
          {children}
        </Box>
      )}
    </AnimatePresence>
  )
}

import { ComponentProps, ElementRef, forwardRef } from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

const ScrollAreaViewport = styled(ScrollAreaPrimitive.Viewport)({
  width: '100%',
  height: '100%',
  '& > div': {
    display: 'block !important',
  },
})

const ScrollAreaScrollbar = styled(ScrollAreaPrimitive.Scrollbar)({
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  zIndex: 1,
  '&[data-orientation="vertical"]': { width: 4 },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: 4,
  },
})

const ScrollAreaThumb = styled(ScrollAreaPrimitive.Thumb)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.action.disabled,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
}))

type ScrollAreaProps = ComponentProps<typeof ScrollAreaPrimitive.Root> & BoxProps

const ScrollArea = forwardRef<ElementRef<typeof ScrollAreaViewport>, ScrollAreaProps>(
  (props, forwardedRef) => {
    const { children, type, scrollHideDelay = 500, dir, sx, ...other } = props

    return (
      <ScrollAreaPrimitive.Root asChild type={type} scrollHideDelay={scrollHideDelay} dir={dir}>
        <Box sx={{ ...sx, overflow: 'hidden' }} {...other}>
          <ScrollAreaViewport ref={forwardedRef}>{children}</ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaScrollbar orientation="horizontal">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaPrimitive.Corner />
        </Box>
      </ScrollAreaPrimitive.Root>
    )
  }
)

ScrollArea.displayName = 'ScrollArea'

export default ScrollArea

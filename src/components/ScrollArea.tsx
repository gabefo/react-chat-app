import { ComponentProps, ElementRef, forwardRef } from 'react'
import { keyframes, styled } from '@mui/material/styles'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

const Root = styled(ScrollAreaPrimitive.Root)({
  hight: '100%',
  flexGrow: 1,
  overflow: 'hidden',
})

const Viewport = styled(ScrollAreaPrimitive.Viewport)({
  width: '100%',
  height: '100%',
  '& > div': {
    display: 'block !important',
  },
})

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
})

const Scrollbar = styled(ScrollAreaPrimitive.Scrollbar)(({ theme }) => ({
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  zIndex: 1,
  '&[data-orientation="vertical"]': { width: 4 },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: 4,
  },
  '&[data-state="visible"]': {
    animation: `${fadeIn} ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeOut}`,
  },
  '&[data-state="hidden"]': {
    animation: `${fadeOut} ${theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.sharp}`,
  },
}))

const Thumb = styled(ScrollAreaPrimitive.Thumb)(({ theme }) => ({
  flex: 1,
  position: 'relative',
  backgroundColor: theme.vars.palette.action.disabled,
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

type ScrollAreaProps = ComponentProps<typeof Root> & ComponentProps<typeof Viewport>

const ScrollArea = forwardRef<ElementRef<typeof Viewport>, ScrollAreaProps>(
  (props, forwardedRef) => {
    const { children, type, scrollHideDelay = 500, dir, ...other } = props

    return (
      <Root type={type} scrollHideDelay={scrollHideDelay} dir={dir}>
        <Viewport ref={forwardedRef} {...other}>
          {children}
        </Viewport>
        <Scrollbar orientation="vertical">
          <Thumb />
        </Scrollbar>
        <Scrollbar orientation="horizontal">
          <Thumb />
        </Scrollbar>
        <ScrollAreaPrimitive.Corner />
      </Root>
    )
  }
)

export default ScrollArea

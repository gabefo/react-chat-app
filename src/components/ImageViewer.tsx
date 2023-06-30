import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const StyledImg = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
})

interface ImageViewerProps {
  title: string
  src?: string
}

export default function ImageViewer({ title, src }: ImageViewerProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Avatar
        src={src}
        alt={title}
        onClick={handleOpen}
        sx={{ width: 128, height: 128, cursor: 'pointer' }}
      />
      <Modal data-mui-color-scheme="dark" open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            bgcolor: 'common.black',
          }}
        >
          <AppBar
            position="absolute"
            color="transparent"
            sx={{
              backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
            }}
          >
            <Toolbar>
              <IconButton edge="start" onClick={handleClose} sx={{ mr: 1 }}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="text.primary">
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          {src && <StyledImg alt={title} src={src} />}
        </Box>
      </Modal>
    </>
  )
}

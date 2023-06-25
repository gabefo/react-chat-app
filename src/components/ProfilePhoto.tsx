import { useRef } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Fab from '@mui/material/Fab'

export default function ProfilePhoto() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadPhoto = () => {
    fileInputRef.current?.click()
  }

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <Fab size="small" color="primary" onClick={handleUploadPhoto}>
          <CameraAltIcon fontSize="small" />
        </Fab>
      }
    >
      <Avatar sx={{ width: 128, height: 128 }} />
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    </Badge>
  )
}

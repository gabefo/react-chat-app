import { ChangeEvent } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ClearIcon from '@mui/icons-material/Clear'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputBase from '@mui/material/InputBase'
import Toolbar from '@mui/material/Toolbar'

interface SearchBarProps {
  open: boolean
  query: string
  onChange: (query: string) => void
  onClose: () => void
}

export default function SearchBar({ open, query, onChange, onClose }: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const handleClear = () => {
    onChange('')
  }

  const handleClose = () => {
    onClose()
  }

  if (!open) {
    return null
  }

  return (
    <AppBar position="absolute" color="default" sx={{ zIndex: 1, mt: { xs: 0, md: 2 } }}>
      <Toolbar>
        <InputBase
          fullWidth
          autoFocus
          value={query}
          onChange={handleChange}
          placeholder="Search"
          inputProps={{ 'aria-label': 'Search' }}
          startAdornment={
            <InputAdornment position="start">
              <IconButton edge="start" onClick={handleClose}>
                <ArrowBackIcon />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            query.length > 0 ? (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClear}
                  onPointerDown={(event) => {
                    event.preventDefault()
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null
          }
        />
      </Toolbar>
    </AppBar>
  )
}

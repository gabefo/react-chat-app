import { ChangeEvent, KeyboardEvent, useMemo, useRef, useState } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, styled } from '@mui/material/styles'
import useVoiceRecorder from '@/hooks/useVoiceRecorder'
import { IMessage, MessageType } from '@/interfaces'
import formatDuration from '@/utils/formatDuration'

const StyledInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  margin: theme.spacing(0, 1),
  padding: '8.5px 16px',
  borderRadius: '20px',
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, 0.06)
      : alpha(theme.palette.common.white, 0.09),
  transition: theme.transitions.create('background-color', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.common.black, 0.09)
        : alpha(theme.palette.common.white, 0.13),
  },
  '&.Mui-focused': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.common.black, 0.06)
        : alpha(theme.palette.common.white, 0.09),
  },
}))

interface ChatInputProps {
  onSend: (details: Pick<IMessage, 'type' | 'content'>) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const isEmpty = useMemo(() => message.trim().length === 0, [message])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { recordingState, recordingTime, startRecording, stopRecording } = useVoiceRecorder()

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey || event.location === 4) {
        event.preventDefault()
        handleSend()
      }
    }
  }

  const handleSend = () => {
    if (!isEmpty) {
      onSend({ type: MessageType.TEXT, content: message.trim() })
    }

    setMessage('')
  }

  const handleAttach = () => {
    fileInputRef.current?.click()
  }

  const handleRecord = async () => {
    if (recordingState === 'inactive') {
      startRecording()
      return
    }

    const blob = await stopRecording()

    onSend({ type: MessageType.VOICE, content: blob })
  }

  return (
    <Container maxWidth={false}>
      <Stack direction="row" alignItems="flex-end" sx={{ py: { xs: 1, sm: 2 } }}>
        {recordingState === 'inactive' ? (
          <>
            <IconButton edge="start">
              <EmojiEmotionsOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleAttach}>
              <AddPhotoAlternateOutlinedIcon />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
                style={{ display: 'none' }}
              />
            </IconButton>
            <StyledInput
              autoFocus
              multiline
              maxRows={4}
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Text message"
            />
          </>
        ) : (
          <>
            <Box sx={{ display: 'inline-flex', ml: -0.5, mr: 1 }}>
              <MicIcon color="error" />
            </Box>
            <Typography sx={{ flexGrow: 1 }}>{formatDuration(recordingTime)}</Typography>
            <IconButton onClick={stopRecording}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
        <IconButton
          edge="end"
          onClick={isEmpty ? handleRecord : handleSend}
          onPointerDown={(event) => {
            event.preventDefault()
          }}
        >
          {isEmpty && recordingState === 'inactive' ? <KeyboardVoiceIcon /> : <SendIcon />}
        </IconButton>
      </Stack>
    </Container>
  )
}

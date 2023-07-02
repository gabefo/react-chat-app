import { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks'
import Moment from 'react-moment'
import { IMessage, MessageType } from '@/interfaces'
import AudioPlayer from './AudioPlayer'
import TextEmoji from './TextEmoji'

interface ChatMessageListItemProps {
  message: IMessage
  onDelete: (message: IMessage) => void
  margin: 'normal' | 'dense'
}

export default function ChatMessageListItem({
  message,
  onDelete,
  margin,
}: ChatMessageListItemProps) {
  const { id, timestamp, isSentByMe, read } = message
  const [showDetails, setShowDetails] = useState(false)
  const popupState = usePopupState({ variant: 'popover', popupId: `message-${id}-menu` })

  const toggleShowDetails = () => {
    setShowDetails((prev) => !prev)
  }

  return (
    <Stack
      alignItems={isSentByMe ? 'flex-end' : 'flex-start'}
      sx={{ pt: margin === 'normal' ? 1.5 : 0.5 }}
    >
      <Stack
        direction={isSentByMe ? 'row-reverse' : 'row'}
        alignItems="center"
        sx={{
          maxWidth: { xs: '95%', md: '85%', lg: '75%', xl: '65%' },
          '&:hover .message-actions': {
            visibility: 'visible',
          },
        }}
      >
        <Box
          data-mui-color-scheme="light"
          sx={(theme) => ({
            position: 'relative',
            minHeight: 40,
            borderRadius: 5,
            overflow: 'hidden',
            ...(isSentByMe
              ? {
                  bgcolor: theme.vars.palette.primary.main,
                  color: theme.vars.palette.primary.contrastText,
                  transformOrigin: '100% 0 0',
                }
              : {
                  bgcolor: 'rgba(0 0 0 / 0.08)',
                  transformOrigin: '0 0 0',
                  [theme.getColorSchemeSelector('dark')]: {
                    bgcolor: 'rgba(255 255 255 / 0.16)',
                  },
                }),
          })}
          onClick={toggleShowDetails}
        >
          {renderContent(message)}
        </Box>
        <Stack direction="row" className="message-actions" sx={{ visibility: 'hidden' }}>
          <IconButton {...bindTrigger(popupState)}>
            <MoreVertIcon />
          </IconButton>
        </Stack>
        <Menu
          {...bindMenu(popupState)}
          anchorOrigin={{ horizontal: isSentByMe ? 'right' : 'left', vertical: 'top' }}
          transformOrigin={{ horizontal: isSentByMe ? 'right' : 'left', vertical: 'top' }}
        >
          {message.type === MessageType.TEXT ? (
            <MenuItem
              onClick={() => {
                popupState.close()
                try {
                  window.navigator.clipboard.writeText(message.content)
                } catch (error) {
                  console.error(error)
                }
              }}
            >
              Copy text
            </MenuItem>
          ) : null}
          <MenuItem
            onClick={() => {
              popupState.close()
              onDelete(message)
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Stack>
      <Collapse in={showDetails} unmountOnExit>
        <Typography variant="caption" color="text.secondary" sx={{ px: 1.5 }}>
          <Moment format="LT">{timestamp}</Moment>
          {' • '}
          {read ? 'Read' : 'Sent'}
        </Typography>
      </Collapse>
    </Stack>
  )
}

function renderContent({ type, content }: IMessage) {
  switch (type) {
    case MessageType.TEXT:
      return (
        <Box sx={{ px: 1.5, py: 1.25 }}>
          <Typography variant="body2" sx={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
            <TextEmoji>{content}</TextEmoji>
          </Typography>
        </Box>
      )
    case MessageType.VOICE:
      return <AudioPlayer srcObject={content} />
  }
}

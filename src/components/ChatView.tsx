import { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CallIcon from '@mui/icons-material/Call'
import CloseIcon from '@mui/icons-material/Close'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VideocamIcon from '@mui/icons-material/Videocam'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { darken, styled } from '@mui/material/styles'
import { useConfirm } from 'material-ui-confirm'
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks'
import { useSnackbar } from 'notistack'
import Moment from 'react-moment'
import { IConversation, IMessage } from '@/interfaces'
import { conversationsSlice, useDispatch } from '@/lib/redux'
import ChatInput from './ChatInput'
import ChatMessageList from './ChatMessageList'
import ContactInfo from './ContactInfo'

const Main = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  inset: 0,
  backgroundColor: theme.vars.palette.background.paper,
  overflow: 'hidden',
  zIndex: theme.zIndex.drawer,
  [theme.breakpoints.up('md')]: {
    position: 'relative',
    flexGrow: 1,
    margin: theme.spacing(2, 0),
    backgroundColor: darken(theme.colorSchemes.light.palette.background.paper, 0.05),
    borderRadius: theme.shape.borderRadius * 6,
    [theme.getColorSchemeSelector('dark')]: {
      backgroundColor: darken(theme.colorSchemes.dark.palette.background.paper, 0.12),
    },
  },
}))

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: 0,
  flexShrink: 0,
  [theme.breakpoints.up('md')]: {
    width: 16,
  },
  ...(open && {
    [theme.breakpoints.up('lg')]: {
      width: '30%',
    },
    [theme.breakpoints.up('xl')]: {
      width: 480,
    },
  }),
  '& .MuiDrawer-paper': {
    width: '100%',
    border: 0,
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2),
      width: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30%',
    },
    [theme.breakpoints.up('xl')]: {
      width: 480,
    },
  },
}))

interface ChatViewProps {
  conversation: IConversation
  onClose: () => void
}

export default function ChatView({ conversation, onClose }: ChatViewProps) {
  const { id, recipient, messages } = conversation
  const dispatch = useDispatch()
  const confirm = useConfirm()
  const { enqueueSnackbar } = useSnackbar()
  const [openInfo, setOpenInfo] = useState(false)
  const popupState = usePopupState({ variant: 'popover', popupId: 'chat-menu' })

  const handleOpenInfo = () => {
    setOpenInfo(true)
  }

  const handleCloseInfo = () => {
    setOpenInfo(false)
  }

  const handleDeleteMessage = (message: IMessage) => {
    confirm({
      title: 'Delete this message?',
      description: 'This action cannot be undone.',
      confirmationText: 'Delete',
    })
      .then(() => {
        const { conversationId, id } = message

        dispatch(
          conversationsSlice.actions.deleteMessage({
            conversationId,
            messageId: id,
          })
        )

        enqueueSnackbar('Message deleted')
      })
      .catch(() => {})
  }

  const handleClearMessages = () => {
    popupState.close()
    confirm({
      title: 'Clear this chat?',
      confirmationText: 'Clear',
    })
      .then(() => {
        dispatch(conversationsSlice.actions.clear(id))
        enqueueSnackbar('Chat cleared')
      })
      .catch(() => {})
  }

  const handleDeleteConversation = () => {
    popupState.close()
    confirm({
      title: 'Delete this conversation?',
      description: 'This action cannot be undone.',
      confirmationText: 'Delete',
    })
      .then(() => {
        onClose()
        dispatch(conversationsSlice.actions.delete(id))
        enqueueSnackbar('Chat deleted')
      })
      .catch(() => {})
  }

  return (
    <>
      <Main>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" sx={{ display: { md: 'none' } }} onClick={onClose}>
              <ArrowBackIcon />
            </IconButton>
            <ButtonBase
              onClick={handleOpenInfo}
              sx={{
                flexGrow: 1,
                justifyContent: 'flex-start',
                textAlign: 'start',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <Avatar
                src={recipient.profilePhoto}
                alt={recipient.displayName}
                sx={{ mr: 2, width: 32, height: 32 }}
              />
              <Stack sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Typography noWrap>{recipient.displayName}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {recipient.isOnline ? (
                    'Online'
                  ) : (
                    <>
                      Last seen <Moment fromNow>{recipient.lastSeen}</Moment>
                    </>
                  )}
                </Typography>
              </Stack>
            </ButtonBase>
            <IconButton>
              <VideocamIcon />
            </IconButton>
            <IconButton>
              <CallIcon />
            </IconButton>
            <IconButton {...bindTrigger(popupState)} edge="end">
              <MoreVertIcon />
            </IconButton>
            <Menu
              {...bindMenu(popupState)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                onClick={() => {
                  popupState.close()
                  handleOpenInfo()
                }}
              >
                Contact info
              </MenuItem>
              <MenuItem
                onClick={() => {
                  popupState.close()
                  onClose()
                }}
              >
                Close
              </MenuItem>
              <MenuItem onClick={handleClearMessages}>Clear</MenuItem>
              <MenuItem onClick={handleDeleteConversation}>Delete</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1 }} />
        <ChatMessageList messages={messages} onDeleteMessage={handleDeleteMessage} />
        <ChatInput
          onSend={({ type, content }) => {
            dispatch(
              conversationsSlice.actions.sendMessage({
                recipient,
                type,
                content,
              })
            )
          }}
        />
      </Main>
      <Drawer variant="persistent" anchor="right" open={openInfo} onClose={handleCloseInfo}>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" onClick={handleCloseInfo}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <ContactInfo contact={recipient} />
      </Drawer>
    </>
  )
}

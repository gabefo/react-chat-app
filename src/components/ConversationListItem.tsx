import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { bindContextMenu, bindMenu, usePopupState } from 'material-ui-popup-state/hooks'
import Moment from 'react-moment'
import { IConversation, MessageType } from '@/interfaces'

interface ConversationListItemProps {
  conversation: IConversation
  active: boolean
  onSelect: (conversation: IConversation) => void
}

export default function ConversationListItem({
  conversation,
  active,
  onSelect,
}: ConversationListItemProps) {
  const { id, recipient, messages, unreadCount } = conversation
  const popupState = usePopupState({
    variant: 'popover',
    popupId: `conversation-${id}-contextmenu`,
  })
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null

  const handleClick = () => {
    onSelect(conversation)
  }

  return (
    <ListItem
      component={motion.li}
      layout
      disablePadding
      sx={{
        bgcolor: 'background.paper',
        zIndex: active ? 1 : 0,
        '&:not(:last-of-type)': {
          mb: 0.5,
        },
      }}
    >
      <ListItemButton
        {...bindContextMenu(popupState)}
        selected={active}
        onClick={handleClick}
        sx={{ px: { xs: 1, sm: 2 }, py: 0.5, minHeight: 64, borderRadius: 3 }}
      >
        <ListItemAvatar>
          <Avatar alt={recipient.displayName} src={recipient.profilePhoto} />
        </ListItemAvatar>
        <ListItemText
          primary={recipient.displayName}
          primaryTypographyProps={{
            noWrap: true,
            ...(unreadCount > 0 && {
              fontWeight: 'medium',
            }),
          }}
          secondary={
            lastMessage && (
              <>
                {lastMessage.isSentByMe && 'You: '}
                {lastMessage.type === MessageType.TEXT && lastMessage.content}
                {lastMessage.type === MessageType.VOICE && 'Audio'}
              </>
            )
          }
          secondaryTypographyProps={{
            noWrap: true,
            ...(unreadCount > 0 && {
              fontWeight: 'medium',
              color: 'text.primary',
            }),
          }}
        />
        <Stack
          alignItems="flex-end"
          sx={{ minWidth: 56, flexShrink: 0, alignSelf: 'stretch', my: '6px' }}
        >
          {lastMessage && (
            <Typography
              variant="caption"
              color={unreadCount > 0 ? 'text.primary' : 'text.secondary'}
              sx={{ lineHeight: '24px', fontWeight: unreadCount > 0 ? 'medium' : 'normal' }}
            >
              <Moment
                calendar={{
                  sameDay: 'h:mm A',
                  lastDay: '[Yesterday]',
                  lastWeek: 'ddd',
                  sameElse: 'l',
                }}
              >
                {lastMessage.timestamp}
              </Moment>
            </Typography>
          )}
          {unreadCount > 0 && (
            <Chip label={unreadCount} size="small" color="primary" sx={{ height: 20 }} />
          )}
        </Stack>
      </ListItemButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>Archive chat</MenuItem>
        <MenuItem onClick={popupState.close}>Delete chat</MenuItem>
        <MenuItem onClick={popupState.close}>Pin chat</MenuItem>
        <MenuItem onClick={popupState.close}>Mark as unread</MenuItem>
      </Menu>
    </ListItem>
  )
}

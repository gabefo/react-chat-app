import { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks'
import { IConversation } from '@/interfaces'
import ConversationList from './ConversationList'
import ListSkeleton from './ListSkeleton'
import ScrollArea from './ScrollArea'
import SearchBar from './SearchBar'

interface ChatsProps {
  loading: boolean
  conversations: IConversation[]
  activeConversationId?: string | null
  onSelectConversation: (conversation: IConversation) => void
  onOpenSettings: () => void
}

export default function Chats({
  loading,
  conversations,
  activeConversationId,
  onSelectConversation,
  onOpenSettings,
}: ChatsProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const popupState = usePopupState({ variant: 'popover', popupId: 'main-menu' })

  const handleOpenSearchBar = () => {
    setSearchOpen(true)
  }

  const handleCloseSearchBar = () => {
    setSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Messages
          </Typography>
          <IconButton onClick={handleOpenSearchBar}>
            <SearchIcon />
          </IconButton>
          <IconButton {...bindTrigger(popupState)} edge="end">
            <MoreVertIcon />
          </IconButton>
          <Menu
            {...bindMenu(popupState)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={popupState.close}>New group</MenuItem>
            <MenuItem onClick={popupState.close}>Select chats</MenuItem>
            <MenuItem
              onClick={() => {
                popupState.close()
                onOpenSettings()
              }}
            >
              Settings
            </MenuItem>
            <MenuItem onClick={popupState.close}>Log out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <SearchBar
        open={searchOpen}
        query={searchQuery}
        onChange={setSearchQuery}
        onClose={handleCloseSearchBar}
      />
      <ScrollArea>
        {loading ? (
          <ListSkeleton />
        ) : (
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={onSelectConversation}
          />
        )}
      </ScrollArea>
    </>
  )
}

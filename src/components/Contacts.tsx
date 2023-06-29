import { useMemo, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { IContact } from '@/interfaces'
import ContactList from './ContactList'
import ListSkeleton from './ListSkeleton'
import SearchBar from './SearchBar'

interface NewChatProps {
  loading: boolean
  contacts: IContact[]
  onSelectContact: (contact: IContact) => void
  onClose: () => void
}

export default function Contacts({ loading, contacts, onSelectContact, onClose }: NewChatProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredContacts = useMemo(
    () =>
      searchQuery
        ? contacts.filter((contact) =>
            contact.displayName.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : contacts,
    [contacts, searchQuery]
  )

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
          <IconButton edge="start" onClick={onClose} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Contacts
          </Typography>
          <IconButton edge="end" onClick={handleOpenSearchBar}>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SearchBar
        open={searchOpen}
        query={searchQuery}
        onChange={setSearchQuery}
        onClose={handleCloseSearchBar}
      />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {loading ? (
          <ListSkeleton />
        ) : (
          <ContactList contacts={filteredContacts} onSelectContact={onSelectContact} />
        )}
      </Box>
    </>
  )
}

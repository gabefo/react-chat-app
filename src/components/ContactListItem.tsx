import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { IContact } from '@/interfaces'

interface ContactListItemProps {
  contact: IContact
  onSelect: (contact: IContact) => void
}

export default function ContactListItem({ contact, onSelect }: ContactListItemProps) {
  const { displayName, profilePhoto, about } = contact

  return (
    <ListItem
      disablePadding
      sx={{
        '&:not(:last-of-type)': { mb: 0.5 },
      }}
    >
      <ListItemButton
        sx={{ px: { xs: 1, sm: 2 }, py: 0.5, minHeight: 64, borderRadius: 3 }}
        onClick={() => onSelect(contact)}
      >
        <ListItemAvatar>
          <Avatar alt={displayName} src={profilePhoto} />
        </ListItemAvatar>
        <ListItemText primary={displayName} secondary={about} />
      </ListItemButton>
    </ListItem>
  )
}

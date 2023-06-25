import List from '@mui/material/List'
import { IContact } from '@/interfaces'
import ContactListItem from './ContactListItem'

interface ContactListProps {
  contacts: IContact[]
  onSelectContact: (contact: IContact) => void
}

export default function ContactList({ contacts, onSelectContact }: ContactListProps) {
  return (
    <List sx={{ px: 1 }}>
      {contacts.map((contact) => (
        <ContactListItem key={contact.id} contact={contact} onSelect={onSelectContact} />
      ))}
    </List>
  )
}

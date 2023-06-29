import { HTMLAttributes, forwardRef, useMemo } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import { Components, GroupedVirtuoso } from 'react-virtuoso'
import { IContact } from '@/interfaces'
import ContactListItem from './ContactListItem'

const components: Components = {
  List: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
    <List ref={ref} {...props} component="div" disablePadding />
  )),
  Item: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
    <ListItem
      ref={ref}
      {...props}
      component="div"
      sx={{
        px: 1,
        py: 0.25,
      }}
    />
  )),
  Group: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
    <ListSubheader ref={ref} {...props} component="div" color="default" sx={{ px: { sm: 3 } }} />
  )),
}

interface ContactListProps {
  contacts: IContact[]
  onSelectContact: (contact: IContact) => void
}

export default function ContactList({ contacts, onSelectContact }: ContactListProps) {
  const { groupCounts, groups } = useMemo(() => {
    const groupedContacts: { [key: string]: number } = {}

    for (const contact of contacts) {
      const firstLetter = contact.displayName.charAt(0).toUpperCase()
      const count = groupedContacts[firstLetter] ?? 0
      groupedContacts[firstLetter] = count + 1
    }

    const groupCounts = Object.values(groupedContacts)
    const groups = Object.keys(groupedContacts)

    return { groupCounts, groups }
  }, [contacts])

  return (
    <GroupedVirtuoso
      groupCounts={groupCounts}
      groupContent={(index) => {
        return <>{groups[index]}</>
      }}
      itemContent={(index) => {
        const contact = contacts[index]

        return <ContactListItem contact={contact} onSelect={onSelectContact} />
      }}
      components={components}
    />
  )
}

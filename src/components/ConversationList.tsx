import List from '@mui/material/List'
import { IConversation } from '@/interfaces'
import ConversationListItem from './ConversationListItem'

interface ConversationListProps {
  conversations: IConversation[]
  activeConversationId?: string | null
  onSelectConversation: (conversation: IConversation) => void
}

export default function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
}: ConversationListProps) {
  return (
    <List sx={{ px: 1 }}>
      {conversations.map((conversation) => (
        <ConversationListItem
          key={conversation.id}
          conversation={conversation}
          active={conversation.id === activeConversationId}
          onSelect={onSelectConversation}
        />
      ))}
    </List>
  )
}

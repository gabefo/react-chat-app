import { HTMLAttributes, forwardRef, useMemo } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Moment from 'react-moment'
import { Components, GroupedVirtuoso } from 'react-virtuoso'
import { IMessage } from '@/interfaces'
import ChatMessageListItem from './ChatMessageListItem'

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.vars.palette.background.paper,
  backgroundImage: theme.vars.overlays[3],
}))

const components: Components = {
  TopItemList: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
    <Box ref={ref} {...props} sx={{ pointerEvents: 'none' }} />
  )),
  List: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
    <Container ref={ref} {...props} maxWidth={false} />
  )),
  Group: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ children, ...props }, ref) => (
      <Stack
        ref={ref}
        {...props}
        alignItems="center"
        sx={{
          py: 1.5,
        }}
      >
        <StyledChip label={children} />
      </Stack>
    )
  ),
}

interface ChatMessageListProps {
  messages: IMessage[]
  onDeleteMessage: (message: IMessage) => void
}

export default function ChatMessageList({ messages, onDeleteMessage }: ChatMessageListProps) {
  const { groupCounts, groups } = useMemo(() => {
    const groupedMessages: { [key: string]: number } = {}

    for (const messsage of messages) {
      const date = new Date(messsage.timestamp).toDateString()
      const count = groupedMessages[date] ?? 0
      groupedMessages[date] = count + 1
    }

    const groupCounts = Object.values(groupedMessages)
    const groups = Object.keys(groupedMessages)

    return { groupCounts, groups }
  }, [messages])

  if (messages.length === 0) {
    return null
  }

  return (
    <GroupedVirtuoso
      groupCounts={groupCounts}
      groupContent={(index) => {
        return (
          <Moment
            calendar={{
              sameDay: '[Today]',
              lastDay: '[Yesterday]',
              lastWeek: 'dddd',
              sameElse: 'l',
            }}
          >
            {groups[index]}
          </Moment>
        )
      }}
      itemContent={(index) => {
        const message = messages[index]

        return (
          <ChatMessageListItem
            message={message}
            onDelete={onDeleteMessage}
            margin={message.senderId !== messages[index - 1]?.senderId ? 'normal' : 'dense'}
          />
        )
      }}
      initialTopMostItemIndex={messages.length - 1}
      alignToBottom
      followOutput
      components={components}
    />
  )
}

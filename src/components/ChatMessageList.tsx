import { Fragment, useEffect, useRef } from 'react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import Moment from 'react-moment'
import { IMessage } from '@/interfaces'
import ChatMessageListItem from './ChatMessageListItem'
import ScrollArea from './ScrollArea'

interface ChatMessageListProps {
  messages: IMessage[]
  onDeleteMessage: (message: IMessage) => void
}

export default function ChatMessageList({ messages, onDeleteMessage }: ChatMessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollEl = scrollRef.current

    if (!scrollEl) {
      return
    }

    let scrollBottom = 0
    let previousClientHeight = scrollEl.clientHeight
    let previousScrollHeight = scrollEl.scrollHeight

    const handleScroll = () => {
      if (
        scrollEl.clientHeight !== previousClientHeight ||
        scrollEl.scrollHeight !== previousScrollHeight
      ) {
        return
      }

      scrollBottom = previousScrollHeight - previousClientHeight - Math.round(scrollEl.scrollTop)
    }

    const resizeObserver = new ResizeObserver(() => {
      if (scrollBottom > 1) {
        scrollBottom += scrollEl.scrollHeight - previousScrollHeight
      }

      previousClientHeight = scrollEl.clientHeight
      previousScrollHeight = scrollEl.scrollHeight

      scrollEl.scrollTop = previousScrollHeight - previousClientHeight - scrollBottom
    })

    resizeObserver.observe(scrollEl)
    resizeObserver.observe(scrollEl.children[0])

    scrollEl.addEventListener('scroll', handleScroll)

    return () => {
      resizeObserver.disconnect()
      scrollEl.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <ScrollArea ref={scrollRef}>
      <Container maxWidth={false}>
        {messages.map((message, index) => {
          const showDate =
            index === 0 || !moment(message.timestamp).isSame(messages[index - 1].timestamp, 'day')

          return (
            <Fragment key={message.id}>
              {showDate && (
                <Stack direction="row" justifyContent="center" sx={index > 0 ? { mt: 1.5 } : {}}>
                  <Typography variant="caption" color="text.secondary">
                    <Moment
                      calendar={{
                        sameDay: '[Today]',
                        lastDay: '[Yesterday]',
                        lastWeek: 'dddd',
                        sameElse: 'l',
                      }}
                    >
                      {message.timestamp}
                    </Moment>
                  </Typography>
                </Stack>
              )}
              <ChatMessageListItem
                message={message}
                onDelete={onDeleteMessage}
                margin={
                  showDate || message.senderId !== messages[index - 1].senderId ? 'normal' : 'dense'
                }
              />
            </Fragment>
          )
        })}
      </Container>
    </ScrollArea>
  )
}

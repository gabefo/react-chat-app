import { faker } from '@faker-js/faker'
import { IConversation, IContact, MessageType, IMessage } from '@/interfaces'
import { contacts } from './contacts'

function createRandomConversation(recipient: IContact): IConversation {
  const id = faker.string.uuid()

  return {
    id,
    recipient,
    messages: faker.helpers
      .multiple<IMessage>(
        () => {
          const isSentByMe = faker.datatype.boolean()

          return {
            id: faker.string.uuid(),
            conversationId: id,
            type: MessageType.TEXT,
            content: faker.lorem.words({ min: 1, max: 10 }),
            timestamp: faker.date.recent({ days: 10 }).toISOString(),
            senderId: isSentByMe ? '' : recipient.id,
            isSentByMe,
            read: true,
          }
        },
        { count: faker.number.int({ min: 10, max: 100 }) }
      )
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp)),
    unreadCount: 0,
  }
}

export const conversations: IConversation[] = faker.helpers
  .arrayElements(contacts, 10)
  .map(createRandomConversation)
  .sort((a, b) =>
    b.messages[b.messages.length - 1].timestamp.localeCompare(
      a.messages[a.messages.length - 1].timestamp
    )
  )

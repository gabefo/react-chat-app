import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import moment from 'moment'
import { IConversation, IContact, IMessage } from '@/interfaces'

interface ConversationsSliceState {
  conversations: IConversation[]
  loading: boolean
}

const initialState: ConversationsSliceState = {
  conversations: [],
  loading: true,
}

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    onLoad(state, action: PayloadAction<IConversation[]>) {
      state.loading = false
      state.conversations = action.payload
    },
    sendMessage(
      state,
      action: PayloadAction<Pick<IMessage, 'type' | 'content'> & { recipient: IContact }>
    ) {
      const { recipient, type, content } = action.payload

      let conversation = state.conversations.find(
        (conversation) => conversation.recipient.id === recipient.id
      )

      if (!conversation) {
        conversation = {
          id: nanoid(),
          recipient,
          messages: [],
          unreadCount: 0,
        } as IConversation

        state.conversations.unshift(conversation)
      }

      conversation.messages.push({
        id: nanoid(),
        conversationId: conversation.id,
        type,
        content,
        timestamp: new Date().toISOString(),
        senderId: '',
        isSentByMe: true,
        read: false,
      } as IMessage)

      state.conversations.sort((a, b) =>
        moment(b.messages.length > 0 ? b.messages[b.messages.length - 1].timestamp : 0).diff(
          a.messages.length > 0 ? a.messages[a.messages.length - 1].timestamp : 0
        )
      )
    },
    deleteMessage(state, action: PayloadAction<{ conversationId: string; messageId: string }>) {
      const { conversationId, messageId } = action.payload

      const conversation = state.conversations.find(
        (conversation) => conversation.id === conversationId
      )

      if (!conversation) {
        return
      }

      conversation.messages = conversation.messages.filter((message) => message.id !== messageId)

      state.conversations.sort((a, b) =>
        moment(b.messages.length > 0 ? b.messages[b.messages.length - 1].timestamp : 0).diff(
          a.messages.length > 0 ? a.messages[a.messages.length - 1].timestamp : 0
        )
      )
    },
    clear(state, action: PayloadAction<string>) {
      const conversationId = action.payload

      const conversation = state.conversations.find(
        (conversation) => conversation.id === conversationId
      )

      if (!conversation) {
        return
      }

      conversation.messages = []

      state.conversations.sort((a, b) =>
        moment(b.messages.length > 0 ? b.messages[b.messages.length - 1].timestamp : 0).diff(
          a.messages.length > 0 ? a.messages[a.messages.length - 1].timestamp : 0
        )
      )
    },
    delete(state, action: PayloadAction<string>) {
      const conversationId = action.payload

      state.conversations = state.conversations.filter(
        (conversation) => conversation.id !== conversationId
      )
    },
  },
})

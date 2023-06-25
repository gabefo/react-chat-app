export enum MessageType {
  TEXT = 'text',
  VOICE = 'voice',
}

type Message<K, T> = {
  id: string
  conversationId: string
  type: K
  content: T
  timestamp: string
  senderId: string
  isSentByMe: boolean
  read: boolean
}

type TextMessage = Message<MessageType.TEXT, string>

type VoiceMessage = Message<MessageType.VOICE, Blob>

export type IMessage = TextMessage | VoiceMessage

import { IContact } from './contact'
import { IMessage } from './message'

export enum ChatType {
  PRIVATE,
  GROUP,
}

export interface IConversation {
  id: string
  recipient: IContact
  messages: IMessage[]
  unreadCount: number
}

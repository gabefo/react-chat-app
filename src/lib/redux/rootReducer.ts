import { contactsSlice } from './slices/contactsSlice'
import { conversationsSlice } from './slices/conversationsSlice/conversationsSlice'

export const reducer = {
  conversations: conversationsSlice.reducer,
  contacts: contactsSlice.reducer,
}

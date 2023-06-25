import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IContact } from '@/interfaces'

interface ContactsSliceState {
  contacts: IContact[]
  loading: boolean
}

const initialState: ContactsSliceState = {
  contacts: [],
  loading: true,
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    onLoad(state, action: PayloadAction<IContact[]>) {
      state.loading = false
      state.contacts = action.payload
    },
    blockContact(state, action: PayloadAction<string>) {
      const contactId = action.payload
      const contact = state.contacts.find((contact) => contact.id === contactId)
      if (!contact) {
        return
      }
      contact.isBlocked = true
    },
    unblockContact(state, action: PayloadAction<string>) {
      const contactId = action.payload
      const contact = state.contacts.find((contact) => contact.id === contactId)
      if (!contact) {
        return
      }
      contact.isBlocked = false
    },
  },
})

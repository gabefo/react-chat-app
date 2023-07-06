import { useEffect, useMemo, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat'
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import Zoom from '@mui/material/Zoom'
import { styled } from '@mui/material/styles'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Contacts from '@/components/Contacts'
import Conversations from '@/components/Conversations'
import Intro from '@/components/Intro'
import Settings from '@/components/Settings'
import TitleAndMetaTags from '@/components/TitleAndMetaTags'
import { IConversation, IContact } from '@/interfaces'
import { conversationsSlice, selectConversations, useDispatch, useSelector } from '@/lib/redux'
import { contactsSlice, selectContacts } from '@/lib/redux/slices/contactsSlice'

const ChatView = dynamic(() => import('@/components/ChatView'))

const Root = styled('div')({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
})

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: '100%',
  flexShrink: 0,
  [theme.breakpoints.up('md')]: {
    width: '40%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '30%',
  },
  [theme.breakpoints.up('xl')]: {
    width: 480,
  },
  [`& .${drawerClasses.paper}`]: {
    width: 'inherit',
    border: 0,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2),
    },
  },
}))

const Home: NextPage = () => {
  const {
    pathname,
    asPath,
    query: { slug },
    push,
  } = useRouter()
  const dispatch = useDispatch()
  const { conversations, loading: conversationsLoading } = useSelector(selectConversations)
  const { contacts, loading: contactsLoading } = useSelector(selectContacts)
  const [panel, setPanel] = useState<string | null>(null)

  const activeConversation = useMemo(() => {
    if (!slug) {
      return null
    }

    const conversationKey = slug[0]

    const conversation = conversations.find(
      (conversation) => conversation.recipient.username === conversationKey
    )

    if (conversation) {
      return conversation
    }

    const contact = contacts.find((contact) => contact.username === conversationKey)

    if (!contact) {
      return null
    }

    return {
      id: 'new-conversation',
      recipient: contact,
      messages: [],
      unreadCount: 0,
    } as IConversation
  }, [conversations, contacts, slug])

  useEffect(() => {
    const getContacts = async () => {
      const data = await import('@/data')
      dispatch(contactsSlice.actions.onLoad(data.contacts))
    }

    const getConversations = async () => {
      const data = await import('@/data')
      dispatch(conversationsSlice.actions.onLoad(data.conversations))
    }

    getContacts()
    getConversations()
  }, [dispatch])

  const handleOpenSettings = () => {
    setPanel('settings')
  }

  const handleOpenContacts = () => {
    setPanel('contacts')
  }

  const handleClosePanel = () => {
    setPanel(null)
  }

  const handleSelectConversation = (conversation: IConversation) => {
    push({ pathname, query: { slug: [conversation.recipient.username] } }, undefined, {
      shallow: true,
    })
  }

  const handleCloseConversation = () => {
    push({ pathname, query: {} }, undefined, { shallow: true })
  }

  const handleSelectContact = (contact: IContact) => {
    push({ pathname, query: { slug: [contact.username] } }, undefined, { shallow: true })
    setPanel(null)
  }

  return (
    <Root>
      <TitleAndMetaTags title={activeConversation?.recipient.displayName} />
      <Drawer variant="permanent">
        <Conversations
          loading={conversationsLoading}
          conversations={conversations}
          activeConversationId={activeConversation?.id}
          onSelectConversation={handleSelectConversation}
          onOpenSettings={handleOpenSettings}
        />
        <Zoom in={panel === null} appear={false} unmountOnExit>
          <Fab
            color="primary"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            onClick={handleOpenContacts}
          >
            <ChatIcon />
          </Fab>
        </Zoom>
        <Settings open={panel === 'settings'} onClose={handleClosePanel} />
        <Contacts
          open={panel === 'contacts'}
          loading={contactsLoading}
          contacts={contacts}
          onSelectContact={handleSelectContact}
          onClose={handleClosePanel}
        />
      </Drawer>
      {activeConversation ? (
        <ChatView
          key={asPath}
          conversation={activeConversation}
          onClose={handleCloseConversation}
        />
      ) : (
        <Intro />
      )}
    </Root>
  )
}

export default Home

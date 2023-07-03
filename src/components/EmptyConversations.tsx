import MessageIcon from '@mui/icons-material/Message'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Root = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: theme.spacing(3),
  textAlign: 'center',
}))

export default function EmptyConversations() {
  return (
    <Root>
      <Typography variant="subtitle1" color="text.secondary">
        To start a new conversation, tap{' '}
        <MessageIcon color="disabled" sx={{ verticalAlign: 'middle' }} /> at the bottom of your
        screen.
      </Typography>
    </Root>
  )
}

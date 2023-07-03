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

export default function SearchNoResults() {
  return (
    <Root>
      <Typography variant="subtitle1" color="text.secondary">
        No results
      </Typography>
    </Root>
  )
}

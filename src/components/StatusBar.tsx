import AddIcon from '@mui/icons-material/Add'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import ScrollArea from './ScrollArea'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    width: 22,
    height: 22,
    borderRadius: '50%',
    padding: 0,
    backgroundColor: theme.palette.primary.main,
    border: `2px solid ${theme.palette.background.paper}`,
    color: theme.palette.primary.contrastText,
    fontSize: 18,
  },
}))

export default function StatusBar() {
  return (
    <ScrollArea>
      <Stack direction="row" sx={{ px: { sm: 1 } }}>
        <Stack alignItems="center" gap={1} sx={{ minWidth: 72, flexShrink: 0 }}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<AddIcon color="inherit" fontSize="inherit" />}
          >
            <Avatar />
          </StyledBadge>
          <Typography variant="caption" color="text.secondary">
            My status
          </Typography>
        </Stack>
      </Stack>
    </ScrollArea>
  )
}

import AddIcon from '@mui/icons-material/Add'
import Avatar from '@mui/material/Avatar'
import Badge, { badgeClasses } from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const StyledBadge = styled(Badge)(({ theme }) => ({
  [`& .${badgeClasses.badge}`]: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    padding: 0,
    backgroundColor: theme.vars.palette.primary.main,
    border: `2px solid ${theme.vars.palette.background.paper}`,
    color: theme.vars.palette.primary.contrastText,
    fontSize: 18,
  },
}))

export default function StatusBar() {
  return (
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
  )
}

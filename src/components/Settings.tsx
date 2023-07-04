import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, useColorScheme } from '@mui/material/styles'
import ProfilePhoto from './ProfilePhoto'

const Root = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  inset: 0,
  zIndex: theme.vars.zIndex.drawer,
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(2),
  },
}))

interface SettingsProps {
  open: boolean
  onClose: () => void
}

export default function Settings({ open, onClose }: SettingsProps) {
  const { mode, systemMode, setMode } = useColorScheme()

  const resolvedMode = mode === 'system' ? systemMode : mode

  const toggleMode = () => {
    setMode(resolvedMode === 'light' ? 'dark' : 'light')
  }

  return (
    <Slide in={open} direction="up" unmountOnExit>
      <Root elevation={0} square>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" onClick={onClose}>
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Container sx={{ pb: 3 }}>
            <Stack alignItems="center" gap={2} sx={{ mb: 3 }}>
              <ProfilePhoto />
              <Typography variant="h5">Gabriel Oliveira</Typography>
            </Stack>
            <Card>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton role={undefined} onClick={toggleMode}>
                    <ListItemIcon>
                      <DarkModeIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-dark-mode" primary="Dark mode" />
                    <Switch
                      edge="end"
                      checked={resolvedMode === 'dark'}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': 'switch-list-label-dark-mode',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Card>
          </Container>
        </Box>
      </Root>
    </Slide>
  )
}

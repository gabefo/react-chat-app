import BlockIcon from '@mui/icons-material/Block'
import CallIcon from '@mui/icons-material/Call'
import GroupIcon from '@mui/icons-material/Group'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ReportIcon from '@mui/icons-material/Report'
import VideocamIcon from '@mui/icons-material/Videocam'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useConfirm } from 'material-ui-confirm'
import { useSnackbar } from 'notistack'
import { IContact } from '@/interfaces'
import ImageViewer from './ImageViewer'
import TextEmoji from './TextEmoji'

interface ContactInfoProps {
  contact: IContact
}

export default function ContactInfo({ contact }: ContactInfoProps) {
  const { displayName, profilePhoto, about } = contact
  const { enqueueSnackbar } = useSnackbar()
  const confirm = useConfirm()

  return (
    <Container sx={{ pb: 3 }}>
      <Stack alignItems="center" gap={2} sx={{ mb: 3 }}>
        <ImageViewer title={displayName} src={profilePhoto} />
        <Typography variant="h5">{displayName}</Typography>
        <Stack direction="row">
          <IconButton color="primary" size="large">
            <CallIcon fontSize="large" />
          </IconButton>
          <IconButton color="primary" size="large">
            <VideocamIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Stack>
      <Card sx={{ mb: 1 }}>
        <List disablePadding>
          <ListItem>
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={<TextEmoji>{about}</TextEmoji>}
              secondary="About"
              sx={{ display: 'flex', flexDirection: 'column-reverse' }}
            />
          </ListItem>
        </List>
      </Card>
      <Card>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText
                id="switch-list-label-mute-notifications"
                primary="Mute notifications"
              />
              <Switch
                edge="end"
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': 'switch-list-label-mute-notifications',
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={`Create group with ${displayName}`} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                confirm({
                  title: `Block ${displayName}?`,
                  confirmationText: 'Block',
                })
                  .then(() => {
                    enqueueSnackbar(`${displayName} blocked`)
                  })
                  .catch(() => {})
              }}
            >
              <ListItemIcon>
                <BlockIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary={`Block ${displayName}`}
                primaryTypographyProps={{ color: 'error' }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                confirm({
                  title: `Report ${displayName}?`,
                  confirmationText: 'Report',
                })
                  .then(() => {
                    enqueueSnackbar(`${displayName} reported`)
                  })
                  .catch(() => {})
              }}
            >
              <ListItemIcon>
                <ReportIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary={`Report ${displayName}`}
                primaryTypographyProps={{ color: 'error' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Card>
    </Container>
  )
}

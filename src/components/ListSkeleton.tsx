import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'

export default function ListSkeleton() {
  return (
    <List>
      {Array.from(Array(10)).map((_, index) => (
        <ListItem key={index} sx={{ px: { sm: 3 }, py: 0.75 }}>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText primary={<Skeleton width="60%" />} secondary={<Skeleton />} />
        </ListItem>
      ))}
    </List>
  )
}

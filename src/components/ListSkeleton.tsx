import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'

export default function ListSkeleton() {
  return (
    <List
      sx={{
        px: { sm: 1 },
        '&:not(:last-of-type)': { mb: 0.5 },
      }}
    >
      {Array.from(Array(10)).map((_, index) => (
        <ListItem key={index} sx={{ py: 0.5 }}>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText primary={<Skeleton width="60%" />} secondary={<Skeleton />} />
        </ListItem>
      ))}
    </List>
  )
}

export interface IContact {
  id: string
  username: string
  displayName: string
  profilePhoto?: string
  about?: string
  isOnline: boolean
  lastSeen?: string
  isBlocked: boolean
}

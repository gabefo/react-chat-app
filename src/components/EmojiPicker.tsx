import { HTMLAttributes, SyntheticEvent, forwardRef, useCallback, useRef, useState } from 'react'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags'
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols'
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation'
import Menu, { MenuProps, menuClasses } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tab, { TabProps } from '@mui/material/Tab'
import Tabs, { TabsProps, tabsClasses } from '@mui/material/Tabs'
import { styled } from '@mui/material/styles'
import { VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'
import { EmojiType, emojisByCategory, emojisByNative, fromCodePoints } from '@/lib/emojis'
import Emoji from './Emoji'

const categories = [
  {
    id: 'frequent',
    title: 'Frequently used',
    Icon: AccessTimeFilledIcon,
    emojis: ['👍', '😀', '😘', '😍', '😆', '😜', '😅', '😂', '😱', '🤔'].map(
      (e) => emojisByNative[e] as EmojiType
    ),
  },
  {
    id: 'smileys',
    title: 'Smileys & Emotion',
    Icon: EmojiEmotionsIcon,
    emojis: emojisByCategory['Smileys & Emotion'],
  },
  {
    id: 'people',
    title: 'People & Body',
    Icon: EmojiPeopleIcon,
    emojis: emojisByCategory['People & Body'],
  },
  {
    id: 'nature',
    title: 'Animals & Nature',
    Icon: EmojiNatureIcon,
    emojis: emojisByCategory['Animals & Nature'],
  },
  {
    id: 'foods',
    title: 'Food & Drink',
    Icon: EmojiFoodBeverageIcon,
    emojis: emojisByCategory['Food & Drink'],
  },
  {
    id: 'activities',
    title: 'Activities',
    Icon: EmojiEventsIcon,
    emojis: emojisByCategory['Activities'],
  },
  {
    id: 'places',
    title: 'Travel & Places',
    Icon: EmojiTransportationIcon,
    emojis: emojisByCategory['Travel & Places'],
  },
  {
    id: 'objects',
    title: 'Objects',
    Icon: EmojiObjectsIcon,
    emojis: emojisByCategory['Objects'],
  },
  {
    id: 'symbols',
    title: 'Symbols',
    Icon: EmojiSymbolsIcon,
    emojis: emojisByCategory['Symbols'],
  },
  {
    id: 'flags',
    title: 'Flags',
    Icon: EmojiFlagsIcon,
    emojis: emojisByCategory['Flags'],
  },
]

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  height: 260,
  maxHeight: '40vh',
})

const StyledTabs = styled((props: TabsProps) => (
  <Tabs {...props} variant="fullWidth" TabIndicatorProps={{ children: <span /> }} />
))(({ theme }) => ({
  flexShrink: 0,
  minHeight: 0,
  [`& .${tabsClasses.indicator}`]: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& span': {
      width: 24,
      backgroundColor: theme.vars.palette.primary.main,
      borderRadius: '4px 4px 0 0',
    },
  },
}))

const StyledTab = styled((props: TabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  padding: theme.spacing(1),
  minWidth: 0,
  minHeight: 0,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.5),
    minWidth: 0,
    minHeight: 0,
  },
}))

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    {...props}
  />
))(({ theme }) => ({
  [`& .${menuClasses.list}`]: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    maxWidth: 296,
  },
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.vars.shape.borderRadius,
}))

const Content = styled('div')({
  flexGrow: 1,
  overflow: 'hidden',
})

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '44px',
  gridTemplateColumns: 'repeat(auto-fill, 44px)',
  justifyContent: 'space-between',
  padding: '2px',
  [theme.breakpoints.up('sm')]: {
    padding: '10px',
  },
}))

const components = {
  List: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
    <Grid ref={ref} {...props} />
  )),
}

interface EmojiPickerProps {
  onEmojiSelect?: (emoji: string) => void
}

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const virtuosoRef = useRef<VirtuosoGridHandle>(null)
  const [currentTab, setCurrentTab] = useState(0)
  const [activeEmoji, setActiveEmoji] = useState<EmojiType | null>(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
  const menuOpen = menuAnchorEl !== null

  const emojis = categories[currentTab].emojis

  const handleTabChange = useCallback((_event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
    virtuosoRef.current?.scrollToIndex(0)
  }, [])

  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
  }

  return (
    <Root>
      <StyledTabs value={currentTab} onChange={handleTabChange}>
        {categories.map(({ id, title, Icon }) => (
          <StyledTab key={id} icon={<Icon fontSize="small" />} aria-label={title} />
        ))}
      </StyledTabs>
      <Content>
        <VirtuosoGrid
          ref={virtuosoRef}
          data={emojis}
          itemContent={(_, emoji) => {
            const native = fromCodePoints(emoji.unified)
            const hasSkinVariations = typeof emoji.skin_variations !== 'undefined'

            const id = `emoji-button-${emoji.unified}`

            let className = 'emoji-button'
            if (hasSkinVariations) {
              className += ' has-skins'
            }

            return (
              <button
                id={id}
                className={className}
                tabIndex={-1}
                aria-label={native}
                onClick={() => onEmojiSelect?.(native)}
                {...(hasSkinVariations && {
                  'aria-controls': menuAnchorEl?.id === id ? 'emoji-skins-menu' : undefined,
                  'aria-haspopup': true,
                  'aria-expanded': menuAnchorEl?.id === id ? true : undefined,
                  onContextMenu: (event) => {
                    event.preventDefault()
                    setMenuAnchorEl(event.currentTarget)
                    setActiveEmoji(emoji)
                  },
                })}
              >
                <Emoji emoji={native} />
              </button>
            )
          }}
          components={components}
        />
      </Content>
      <StyledMenu
        id="emoji-skins-menu"
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': menuOpen ? menuAnchorEl.id : undefined,
        }}
      >
        {activeEmoji && activeEmoji.skin_variations
          ? [activeEmoji, ...Object.values(activeEmoji.skin_variations)].map((skin) => {
              const native = fromCodePoints(skin.unified)

              return (
                <StyledMenuItem
                  key={skin.unified}
                  onClick={() => {
                    onEmojiSelect?.(native)
                    handleCloseMenu()
                  }}
                >
                  <Emoji emoji={native} />
                </StyledMenuItem>
              )
            })
          : null}
      </StyledMenu>
    </Root>
  )
}

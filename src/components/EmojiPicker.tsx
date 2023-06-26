import data from '@emoji-mart/data/sets/14/apple.json'
import Picker from '@emoji-mart/react'
import GlobalStyles from '@mui/material/GlobalStyles'
import { useTheme } from '@mui/material/styles'
import type { Emoji } from '@emoji-mart/data'

type EmojiPickerProps = {
  onEmojiSelect?: (emoji: Emoji, event: PointerEvent) => void
}

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const theme = useTheme()

  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          'em-emoji-picker': {
            width: '100%',
            height: 260,
            maxHeight: '40vh',
            '--border-radius': 0,
            '--category-icon-size': '24px',
            '--font-family': theme.typography.subtitle2.fontFamily,
            '--font-size': theme.typography.subtitle2.fontSize,
            '--rgb-color': theme.vars.palette.text.secondaryChannel.replaceAll(' ', ','),
            '--rgb-accent': theme.vars.palette.primary.mainChannel.replaceAll(' ', ','),
            '--rgb-background': theme.vars.palette.background.defaultChannel.replaceAll(' ', ','),
            '--color-border': 'transparent',
            '--color-border-over': 'transparent',
            '--shadow': 'none',
          },
        })}
      />
      <Picker
        data={data}
        set="apple"
        categoryIcons={{
          frequent: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5Z"/></svg>',
          },
          people: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.5c2.33 0 4.3-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5M8.5 11A1.5 1.5 0 0 0 10 9.5A1.5 1.5 0 0 0 8.5 8A1.5 1.5 0 0 0 7 9.5A1.5 1.5 0 0 0 8.5 11m7 0A1.5 1.5 0 0 0 17 9.5A1.5 1.5 0 0 0 15.5 8A1.5 1.5 0 0 0 14 9.5a1.5 1.5 0 0 0 1.5 1.5M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/></svg>',
          },
          nature: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c1.74 0 3.36.5 4.74 1.35C17.38 3.53 18.38 3 19.5 3A3.5 3.5 0 0 1 23 6.5c0 1.5-.95 2.78-2.28 3.28c.18.72.28 1.45.28 2.22a9 9 0 0 1-9 9a9 9 0 0 1-9-9c0-.77.1-1.5.28-2.22A3.51 3.51 0 0 1 1 6.5A3.5 3.5 0 0 1 4.5 3c1.12 0 2.12.53 2.76 1.35C8.64 3.5 10.26 3 12 3m0 2a7 7 0 0 0-7 7a7 7 0 0 0 7 7a7 7 0 0 0 7-7a7 7 0 0 0-7-7m4.19 5.3c.36 1.33-.11 2.61-1.04 2.86c-.94.26-1.98-.62-2.34-1.96c-.36-1.33.11-2.61 1.04-2.86c.94-.25 1.98.62 2.34 1.96m-8.38 0c.36-1.34 1.4-2.21 2.34-1.96c.93.25 1.4 1.53 1.04 2.86c-.36 1.34-1.4 2.22-2.34 1.96c-.93-.25-1.4-1.53-1.04-2.86M12 14c.6 0 1.13.19 1.5.5l-1 1c0 .42.34.75.75.75a.75.75 0 0 0 .75-.75a.5.5 0 0 1 .5-.5a.5.5 0 0 1 .5.5a1.75 1.75 0 0 1-1.75 1.75c-.49 0-.93-.2-1.25-.53c-.32.33-.76.53-1.25.53A1.75 1.75 0 0 1 9 15.5a.5.5 0 0 1 .5-.5a.5.5 0 0 1 .5.5a.75.75 0 0 0 .75.75a.75.75 0 0 0 .75-.75l-1-1c.37-.31.9-.5 1.5-.5Z"/></svg>',
          },
          foods: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 10a5.268 5.268 0 0 0-7-2V3h-2v5a5.268 5.268 0 0 0-7 2c-2 3 3 12 5 12s2-1 3-1s1 1 3 1s7-9 5-12m-1.75 3.38c-.62 2.47-1.84 4.74-3.55 6.62c-.2 0-.43-.1-.6-.25a3.34 3.34 0 0 0-4.2 0c-.17.15-.4.25-.6.25a15.267 15.267 0 0 1-3.55-6.61c-.25-.73-.3-1.52-.09-2.27A3.37 3.37 0 0 1 8.5 9.4c.56.01 1.11.14 1.61.39l.89.45h2l.89-.45c.5-.25 1.05-.38 1.61-.39c1.18.03 2.26.68 2.84 1.71c.21.75.16 1.54-.09 2.27M11 5C5.38 8.07 4.11 3.78 4.11 3.78S6.77.19 11 5Z"/></svg>',
          },
          activity: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.05 11H6.9q-.15-.95-.575-1.775T5.25 7.75q-.45.725-.763 1.538T4.05 11Zm13.05 0h2.85q-.125-.9-.437-1.713T18.75 7.75q-.65.65-1.075 1.475T17.1 11ZM5.25 16.25q.65-.65 1.075-1.475T6.9 13H4.05q.125.9.438 1.713t.762 1.537Zm13.5 0q.45-.725.763-1.538T19.95 13H17.1q.15.95.575 1.775t1.075 1.475ZM8.95 11H11V4.05q-1.325.2-2.463.738T6.5 6.2q.975.95 1.613 2.163T8.95 11ZM13 11h2.05q.2-1.425.838-2.638T17.5 6.2q-.9-.875-2.038-1.413T13 4.05V11Zm-2 8.95V13H8.95q-.2 1.425-.838 2.638T6.5 17.8q.9.875 2.038 1.413T11 19.95Zm2 0q1.325-.2 2.463-.737T17.5 17.8q-.975-.95-1.613-2.163T15.05 13H13v6.95ZM12 12Zm0 10q-2.075 0-3.9-.787t-3.175-2.138q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>',
          },
          places: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19v1q0 .425-.288.713T5 21H4q-.425 0-.713-.288T3 20v-8l2.1-6q.15-.45.537-.725T6.5 5h11q.475 0 .863.275T18.9 6l2.1 6v8q0 .425-.287.713T20 21h-1q-.425 0-.713-.288T18 20v-1H6Zm-.2-9h12.4l-1.05-3H6.85L5.8 10ZM5 12v5v-5Zm2.5 4q.625 0 1.063-.438T9 14.5q0-.625-.438-1.063T7.5 13q-.625 0-1.063.438T6 14.5q0 .625.438 1.063T7.5 16Zm9 0q.625 0 1.063-.438T18 14.5q0-.625-.438-1.063T16.5 13q-.625 0-1.063.438T15 14.5q0 .625.438 1.063T16.5 16ZM5 17h14v-5H5v5Z"/></svg>',
          },
          objects: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74c0-3.87-3.13-7-7-7m2 11.58V16h-1v-4.59l1.71-1.7c.39-.39.39-1.03 0-1.42c-.39-.39-1.03-.39-1.42 0L12 9.59l-1.29-1.3c-.39-.39-1.03-.39-1.42 0c-.39.39-.39 1.03 0 1.42l1.71 1.7V16h-1v-2.42C8.23 12.81 7 11.05 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.05-1.23 3.81-3 4.58M9 20h6v1c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-1Z"/></svg>',
          },
          symbols: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4V2h8v2H3Zm3 7V7H3V5h8v2H8v4H6Zm7.7 10.6l-1.4-1.4l7.8-7.8l1.4 1.4l-7.8 7.8Zm.8-5.6q-.65 0-1.075-.425T13 14.5q0-.65.425-1.075T14.5 13q.65 0 1.075.425T16 14.5q0 .65-.425 1.075T14.5 16Zm5 5q-.65 0-1.075-.425T18 19.5q0-.65.425-1.075T19.5 18q.65 0 1.075.425T21 19.5q0 .65-.425 1.075T19.5 21Zm-4-10q-1.025 0-1.763-.738T13 8.5q0-1.025.738-1.788T15.5 5.95q.3 0 .537.038t.463.112V3q0-.425.288-.713T17.5 2H21v2h-3v4.5q0 1.025-.738 1.763T15.5 11Zm-10 11q-1.025 0-1.763-.763T3 19.45q0-.45.188-.912t.562-.838l1.05-1.05l-.35-.35q-.375-.375-.563-.813T3.7 14.55q0-1.025.738-1.763T6.2 12.05q1.025 0 1.763.738T8.7 14.55q0 .5-.162.938T8 16.3l-.35.35l.7.7l1.4-1.4l1.4 1.45l-1.4 1.4l1.4 1.4l-1.4 1.4l-1.4-1.4l-1.05 1.05q-.375.375-.838.563T5.5 22Zm.7-6.75l.35-.35q.075-.075.113-.15t.037-.2q0-.225-.15-.363t-.35-.137q-.2 0-.35.138t-.15.362q0 .075.037.175t.113.175l.35.35ZM5.45 20q.075 0 .2-.038t.2-.112l1.1-1.05l-.7-.7l-1.1 1.05q-.075.075-.113.175T5 19.55q0 .2.125.325T5.45 20Z"/></svg>',
          },
          flags: {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21V4h9l.4 2H20v10h-7l-.4-2H7v7H5Zm7.5-11Zm2.15 4H18V8h-5.25l-.4-2H7v6h7.25l.4 2Z"/></svg>',
          },
        }}
        dynamicWidth
        emojiButtonColors={[theme.vars.palette.action.hover]}
        emojiButtonRadius="4px"
        emojiButtonSize={44}
        emojiSize={32}
        previewPosition="none"
        searchPosition="none"
        skinTonePosition="none"
        onEmojiSelect={onEmojiSelect}
      />
    </>
  )
}

import sheet from 'emoji-datasource-apple/img/apple/sheets/32.png'
import { EmojiType, emojisByNative } from '@/lib/emojis'

const sheet_size = 32

interface EmojiProps {
  emoji: string | EmojiType
  size?: number
}

export default function Emoji({ emoji: emojiProp, size = sheet_size }: EmojiProps) {
  const emoji = typeof emojiProp === 'string' ? emojisByNative[emojiProp] : emojiProp

  if (!emoji) {
    return null
  }

  const native = String.fromCodePoint(...emoji.unified.split('-').map((s) => parseInt(s, 16)))
  const { sheet_x, sheet_y } = emoji

  const ratio = size / sheet_size
  const x = -(sheet_x * (sheet_size + 2) + 1) * ratio
  const y = -(sheet_y * (sheet_size + 2) + 1) * ratio

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      alt={native}
      draggable={false}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        border: 0,
        verticalAlign: 'top',
        backgroundImage: `url(${sheet.src})`,
        backgroundSize: `${sheet.width * ratio}px ${sheet.height * ratio}px`,
        backgroundPosition: `${x}px ${y}px`,
        pointerEvents: 'none',
      }}
    />
  )
}

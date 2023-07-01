import { ReactElement } from 'react'
import Emoji from './Emoji'

const emojiRegex =
  /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)+|\p{EPres}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?|\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})/gu

function renderEmojis(text: string) {
  const result: (string | ReactElement)[] = []

  let arr: RegExpExecArray | null
  let lastIndex = 0

  while ((arr = emojiRegex.exec(text)) !== null) {
    const { index, 0: emoji } = arr

    if (index !== lastIndex) {
      result.push(text.slice(lastIndex, index))
    }

    result.push(<Emoji key={index} emoji={emoji} size={20} />)
    lastIndex = emojiRegex.lastIndex
  }

  if (lastIndex < text.length - 1) {
    result.push(text.slice(lastIndex))
  }

  emojiRegex.lastIndex = 0

  return result
}

interface TextEmojiProps {
  children: string
}

export default function TextEmoji({ children }: TextEmojiProps) {
  return renderEmojis(children)
}

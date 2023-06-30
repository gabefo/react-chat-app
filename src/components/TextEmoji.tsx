import { ReactElement } from 'react'
import Emoji from './Emoji'

const emojiRegex = /\p{Extended_Pictographic}(?:\u200d\p{Extended_Pictographic})*/gu

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

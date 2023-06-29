import { Fragment } from 'react'
import Emoji from './Emoji'

const emojiRegex = /(\p{Extended_Pictographic}(?:\u200d\p{Extended_Pictographic})*)/gu

interface TextEmojiProps {
  children: string
  emojiSize?: number
}

export default function TextEmoji({ children, emojiSize = 20 }: TextEmojiProps) {
  return (
    <>
      {children.split(emojiRegex).map((value, index) => (
        <Fragment key={index}>
          {emojiRegex.test(value) ? <Emoji emoji={value} size={emojiSize} /> : value}
        </Fragment>
      ))}
    </>
  )
}

import emojis from 'emoji-datasource-apple/emoji.json'

emojis.sort((a, b) => a.sort_order - b.sort_order)

export default emojis

export type EmojiType = (typeof emojis)[number]

export const emojisByNative = emojis.reduce<{ [k: string]: EmojiType | undefined }>(
  (obj, emoji) => {
    const native = String.fromCodePoint(...emoji.unified.split('-').map((s) => parseInt(s, 16)))
    obj[native] = emoji
    return obj
  },
  {}
)

export const emojisByCategory = emojis.reduce<{ [k: string]: EmojiType[] }>((obj, emoji) => {
  const { category } = emoji
  if (category in obj) {
    obj[category].push(emoji)
  } else {
    obj[category] = [emoji]
  }
  return obj
}, {})

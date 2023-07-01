import emojis from 'emoji-datasource-apple/emoji.json'

emojis.sort((a, b) => a.sort_order - b.sort_order)

export default emojis

export type EmojiType = (typeof emojis)[number]

export type EmojiSkin = keyof Exclude<EmojiType['skin_variations'], undefined>

export function fromCodePoints(codepoints: string) {
  return String.fromCodePoint(...codepoints.split('-').map((codepoint) => parseInt(codepoint, 16)))
}

export const emojisByNative = emojis.reduce<{ [k: string]: EmojiType | undefined }>(
  (obj, emoji) => {
    obj[fromCodePoints(emoji.unified)] = emoji

    if (emoji.skin_variations) {
      for (const key of Object.keys(emoji.skin_variations)) {
        const variation = emoji.skin_variations[key as EmojiSkin] as EmojiType
        obj[fromCodePoints(variation.unified)] = variation
      }
    }

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

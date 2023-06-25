const zeroPad = (number: number) => String(number).padStart(2, '0')

export default function formatDuration(time: number) {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor(time % 60)
  if (hours === 0) {
    return `${minutes}:${zeroPad(seconds)}`
  }
  return `${hours}:${zeroPad(minutes)}:${zeroPad(seconds)}`
}

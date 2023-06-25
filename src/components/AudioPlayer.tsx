import { useCallback, useEffect, useRef, useState } from 'react'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import formatDuration from '@/utils/formatDuration'

const SliderRoot = styled('span')({
  borderRadius: 12,
  boxSizing: 'content-box',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  touchAction: 'none',
  color: 'inherit',
  WebkitTapHighlightColor: 'transparent',
  height: 2,
  width: 160,
  padding: '13px 0',
})

const SliderRail = styled('span')({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  opacity: 0.38,
  width: '100%',
  height: 'inherit',
  top: '50%',
  transform: 'translateY(-50%)',
})

const SliderTrack = styled('span')({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  width: 0,
  height: 'inherit',
  top: '50%',
  transform: 'translateY(-50%)',
})

const SliderThumb = styled('span')({
  position: 'absolute',
  width: 12,
  height: 12,
  boxSizing: 'border-box',
  borderRadius: '50%',
  outline: 0,
  backgroundColor: 'currentColor',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: '50%',
  left: 0,
  transform: 'translate(-50%, -50%)',
})

interface AudioPlayerProps {
  srcObject: MediaSource | Blob
}

export default function AudioPlayer({ srcObject }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const sliderRef = useRef<HTMLSpanElement>(null)
  const trackRef = useRef<HTMLSpanElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if ('srcObject' in audio) {
      try {
        audio.srcObject = srcObject
        return
      } catch {
        // Do nothing
      }
    }

    audio.src = window.URL.createObjectURL(srcObject)
  }, [srcObject])

  useEffect(() => {
    const audio = audioRef.current
    const slider = sliderRef.current
    const track = trackRef.current
    const thumb = thumbRef.current

    if (!audio || !slider || !track || !thumb) {
      return
    }

    let animationFrameId: number | null = null

    const updateThumb = () => {
      const percent = `${(audio.currentTime / audio.duration) * 100}%`

      track.style.width = percent
      thumb.style.left = percent

      if (!audio.paused) {
        animationFrameId = window.requestAnimationFrame(updateThumb)
      }
    }

    const onPlay = () => {
      setIsPlaying(true)

      const audios = document.getElementsByTagName('audio')
      for (let i = 0; i < audios.length; i++) {
        if (audios[i] !== audio) {
          audios[i].pause()
        }
      }

      animationFrameId = window.requestAnimationFrame(updateThumb)
    }

    const onPause = () => {
      setIsPlaying(false)
    }

    const onEnded = () => {
      audio.currentTime = 0
    }

    const onTimeUpdate = () => {
      setCurrentTime(Math.floor(audio.currentTime))

      slider.setAttribute('aria-valuenow', audio.currentTime.toString())
    }

    const onDurationChange = () => {
      if (audio.duration === Infinity) {
        audio.currentTime = Number.MAX_SAFE_INTEGER
        return
      }

      audio.currentTime = 0

      setDuration(audio.duration)
    }

    let oldPaused: boolean

    const onDragStart = (event: PointerEvent) => {
      if (event.button !== 0) {
        return
      }

      event.preventDefault()

      setIsSeeking(true)

      oldPaused = audio.paused
      audio.pause()

      onDragMove(event)

      window.addEventListener('pointermove', onDragMove)
      window.addEventListener('pointerup', onDragEnd)
    }

    const onDragMove = (event: PointerEvent) => {
      const { width, left } = slider.getBoundingClientRect()
      const percent = Math.min(Math.max((event.clientX - left) / width, 0), 1)

      audio.currentTime = percent * audio.duration

      updateThumb()
    }

    const onDragEnd = () => {
      setIsSeeking(false)

      if (!oldPaused) {
        audio.play()
      }

      window.removeEventListener('pointermove', onDragMove)
      window.removeEventListener('pointerup', onDragEnd)
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    slider.addEventListener('pointerdown', onDragStart)

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }

      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      slider.removeEventListener('pointerdown', onDragStart)
      window.removeEventListener('pointermove', onDragMove)
      window.removeEventListener('pointerup', onDragEnd)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [])

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{ pl: 0.5, pr: 2, py: 0.5, userSelect: 'none' }}
    >
      <IconButton color="inherit" size="small" onClick={togglePlay} sx={{ fontSize: '34px' }}>
        {isPlaying ? <PauseIcon fontSize="inherit" /> : <PlayArrowRoundedIcon fontSize="inherit" />}
      </IconButton>
      <SliderRoot
        ref={sliderRef}
        role="slider"
        tabIndex={0}
        aria-label="Seek slider"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuetext={`${formatDuration(currentTime)}/${formatDuration(duration)}`}
      >
        <SliderRail />
        <SliderTrack ref={trackRef} />
        <SliderThumb ref={thumbRef} />
      </SliderRoot>
      <Typography
        variant="body2"
        color="inherit"
        sx={{ flexShrink: 0, width: 32, textAlign: 'end' }}
      >
        {formatDuration(isPlaying || isSeeking ? currentTime : duration)}
      </Typography>
      <audio ref={audioRef} />
    </Stack>
  )
}

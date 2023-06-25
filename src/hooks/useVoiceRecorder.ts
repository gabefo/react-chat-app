import { useCallback, useEffect, useRef, useState } from 'react'

export default function useVoiceRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number>()
  const [recordingState, setRecordingState] = useState<RecordingState>('inactive')
  const [recordingTime, setRecordingTime] = useState(0)

  useEffect(() => {
    return () => {
      const mediaRecorder = mediaRecorderRef.current
      if (mediaRecorder) {
        mediaRecorder.stop()
        mediaRecorder.stream.getTracks().forEach((track) => {
          track.stop()
        })
      }
      window.clearInterval(timerRef.current)
    }
  }, [])

  const startRecording = useCallback(async () => {
    if (!window.navigator.mediaDevices) {
      return
    }

    let stream: MediaStream

    try {
      stream = await window.navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      return
    }

    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
    mediaRecorderRef.current = mediaRecorder

    const chunks = [] as Blob[]
    chunksRef.current = chunks

    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data)
      }
    }

    const audios = document.getElementsByTagName('audio')
    for (let i = 0; i < audios.length; i++) {
      audios[i].pause()
    }

    mediaRecorder.start()

    setRecordingState('recording')

    timerRef.current = window.setInterval(() => {
      setRecordingTime((time) => time + 1)
    }, 1000)
  }, [])

  const stopRecording = useCallback(
    () =>
      new Promise<Blob>((resolve, reject) => {
        const mediaRecorder = mediaRecorderRef.current

        if (!mediaRecorder) {
          reject(new Error('The MediaRecorder is not active'))
          return
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
          resolve(blob)
        }

        mediaRecorder.stop()

        mediaRecorder.stream.getTracks().forEach((track) => {
          track.stop()
        })

        mediaRecorderRef.current = null

        window.clearInterval(timerRef.current)

        setRecordingState('inactive')
        setRecordingTime(0)
      }),
    []
  )

  return { recordingState, recordingTime, startRecording, stopRecording }
}

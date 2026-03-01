import { createContext, useContext, useState, useCallback } from 'react'
import { tracks } from '../mock/tracks'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(tracks[0] || null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [queue, setQueue] = useState(tracks.slice(0, 5))

  const playPause = useCallback(() => setIsPlaying(p => !p), [])
  const playTrack = useCallback((track) => {
    setCurrentTrack(track || null)
    setIsPlaying(true)
    setProgress(0)
  }, [])
  const nextTrack = useCallback(() => {
    const idx = queue.findIndex(t => t.id === currentTrack?.id)
    const next = idx >= 0 && idx < queue.length - 1 ? queue[idx + 1] : queue[0]
    if (next) playTrack(next)
  }, [currentTrack, queue, playTrack])
  const prevTrack = useCallback(() => {
    const idx = queue.findIndex(t => t.id === currentTrack?.id)
    const prev = idx > 0 ? queue[idx - 1] : queue[queue.length - 1]
    if (prev) playTrack(prev)
  }, [currentTrack, queue, playTrack])

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      progress,
      setProgress,
      volume,
      setVolume,
      queue,
      setQueue,
      playPause,
      playTrack,
      nextTrack,
      prevTrack,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}

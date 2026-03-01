import { createContext, useContext, useCallback, useState, useEffect } from 'react'

const STORAGE_KEY = 'mangaplus_lastRead'
const LAST_OPENED_KEY = 'mangaplus_lastOpened'

const ReadingProgressContext = createContext(null)

export function ReadingProgressProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })

  const [lastOpened, setLastOpenedState] = useState(() => {
    try {
      const raw = localStorage.getItem(LAST_OPENED_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state])

  useEffect(() => {
    try {
      if (lastOpened) {
        localStorage.setItem(LAST_OPENED_KEY, JSON.stringify(lastOpened))
      } else {
        localStorage.removeItem(LAST_OPENED_KEY)
      }
    } catch {}
  }, [lastOpened])

  const getLastRead = useCallback(
    (titleId) => state[titleId] ?? null,
    [state]
  )

  const setLastRead = useCallback((titleId, chapterNumber) => {
    setState((prev) => ({ ...prev, [titleId]: chapterNumber }))
    setLastOpenedState({ titleId, chapterNumber })
  }, [])

  const clearLastOpened = useCallback(() => {
    setLastOpenedState(null)
  }, [])

  return (
    <ReadingProgressContext.Provider value={{ getLastRead, setLastRead, lastOpened, clearLastOpened }}>
      {children}
    </ReadingProgressContext.Provider>
  )
}

export function useReadingProgress() {
  const ctx = useContext(ReadingProgressContext)
  if (!ctx) throw new Error('useReadingProgress must be used within ReadingProgressProvider')
  return ctx
}

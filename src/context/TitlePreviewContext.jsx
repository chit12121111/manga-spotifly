import { createContext, useContext, useState, useCallback } from 'react'
import TitlePreviewModal from '../components/TitlePreviewModal'

const TitlePreviewContext = createContext(null)

export function TitlePreviewProvider({ children }) {
  const [previewTitleId, setPreviewTitleId] = useState(null)

  const openPreview = useCallback((id) => setPreviewTitleId(id), [])
  const closePreview = useCallback(() => setPreviewTitleId(null), [])

  return (
    <TitlePreviewContext.Provider value={{ previewTitleId, openPreview, closePreview }}>
      {children}
      {previewTitleId && (
        <TitlePreviewModal titleId={previewTitleId} onClose={closePreview} />
      )}
    </TitlePreviewContext.Provider>
  )
}

export function useTitlePreview() {
  const ctx = useContext(TitlePreviewContext)
  return ctx
}

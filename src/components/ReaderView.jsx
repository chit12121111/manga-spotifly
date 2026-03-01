import { useState, useCallback, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PAGE_COUNT = 5

function getPageImageUrl(chapterNum, pageNum) {
  return `https://picsum.photos/seed/ch${chapterNum}-p${pageNum}/800/1200`
}

function PageImage({ page, chapterNumber }) {
  const [loaded, setLoaded] = useState(false)
  const imageUrl = getPageImageUrl(chapterNumber, page.number)
  return (
    <div className="relative w-full flex justify-center py-1 min-h-[200px]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-manga-card animate-pulse">
          <span className="text-manga-muted text-sm">Loading...</span>
        </div>
      )}
      <img
        src={imageUrl}
        alt={`Page ${page.number}`}
        className={`max-w-full h-auto object-contain ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default function ReaderView({
  titleId,
  titleName,
  chapterNumber,
  chapterTitle,
  chapters = [],
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}) {
  const [showBar, setShowBar] = useState(true)
  const [mode, setMode] = useState('vertical')
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const navigate = useNavigate()
  const horizontalScrollRef = useRef(null)

  const pages = Array.from({ length: PAGE_COUNT }, (_, i) => ({ number: i + 1 }))
  const totalPages = pages.length

  const toggleBar = useCallback(() => setShowBar((b) => !b), [])

  const scrollToPage = useCallback((index) => {
    if (!horizontalScrollRef.current || index < 0 || index >= totalPages) return
    const el = horizontalScrollRef.current
    const pageWidth = el.clientWidth
    el.scrollTo({ left: pageWidth * index, behavior: 'smooth' })
    setCurrentPageIndex(index)
  }, [totalPages])

  useEffect(() => {
    const el = horizontalScrollRef.current
    if (!el || mode !== 'horizontal') return
    const handleScroll = () => {
      const pageWidth = el.clientWidth
      const index = Math.round(el.scrollLeft / pageWidth)
      setCurrentPageIndex(Math.max(0, Math.min(index, totalPages - 1)))
    }
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [mode, totalPages])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        if (mode === 'horizontal') {
          if (currentPageIndex > 0) scrollToPage(currentPageIndex - 1)
          else onPrev?.()
        } else {
          onPrev?.()
        }
      } else if (e.key === 'ArrowRight') {
        if (mode === 'horizontal') {
          if (currentPageIndex < totalPages - 1) scrollToPage(currentPageIndex + 1)
          else onNext?.()
        } else {
          onNext?.()
        }
      } else if (e.key === ' ' || e.key === 'Escape') {
        e.preventDefault()
        toggleBar()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mode, currentPageIndex, totalPages, scrollToPage, onPrev, onNext, toggleBar])

  const handleChapterChange = (e) => {
    const num = e.target.value
    if (num) navigate(`/title/${titleId}/chapter/${num}`)
  }

  return (
    <div className="fixed inset-0 bg-manga-bg flex flex-col z-30">
      {showBar && (
        <div className="flex-shrink-0 h-14 bg-black/90 flex items-center justify-between px-3 sm:px-4 gap-2">
          <Link
            to={`/title/${titleId}`}
            className="p-2 rounded-full hover:bg-white/10 text-white flex-shrink-0"
            aria-label="Back to title"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </Link>
          <div className="flex-1 min-w-0 text-center">
            <p className="text-white font-medium truncate text-sm sm:text-base">{titleName}</p>
            <p className="text-manga-muted text-xs">
              Ch. {chapterNumber}
              {chapterTitle ? ` – ${chapterTitle}` : ''}
              {mode === 'horizontal' && ` · Page ${currentPageIndex + 1}/${totalPages}`}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {chapters.length > 0 && (
              <select
                value={chapterNumber}
                onChange={handleChapterChange}
                className="bg-manga-card text-white text-xs rounded px-2 py-1.5 border border-white/20 max-w-[80px] sm:max-w-[100px]"
                title="Jump to track"
              >
                {chapters.map((ch) => (
                  <option key={ch.chapterNumber} value={ch.chapterNumber}>
                    Ch.{ch.chapterNumber}
                  </option>
                ))}
              </select>
            )}
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="bg-manga-card text-white text-xs sm:text-sm rounded px-2 py-1.5 border border-white/20"
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </div>
        </div>
      )}

      <div
        className="flex-1 min-h-0 overflow-hidden"
        onClick={toggleBar}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === ' ') e.preventDefault(); toggleBar(); }}
        aria-label="Toggle toolbar"
      >
        {mode === 'vertical' ? (
          <div className="h-full overflow-y-auto overflow-x-hidden">
            {pages.map((page) => (
              <PageImage
                key={page.number}
                page={page}
                chapterNumber={chapterNumber}
              />
            ))}
          </div>
        ) : (
          <div
            ref={horizontalScrollRef}
            className="h-full overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {pages.map((page, index) => (
              <div
                key={page.number}
                className="flex-shrink-0 w-full h-full flex items-center justify-center snap-center snap-always"
              >
                <div className="w-full flex justify-center min-h-0 max-h-full">
                  <img
                    src={getPageImageUrl(chapterNumber, page.number)}
                    alt={`Page ${page.number}`}
                    className="max-w-full max-h-full w-auto object-contain"
                    onLoad={() => {
                      if (index === 0) setCurrentPageIndex(0)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showBar && (
        <div className="flex-shrink-0 h-14 bg-black/90 flex items-center justify-between px-4 gap-4">
          <Link
            to={hasPrev ? `/title/${titleId}/chapter/${chapterNumber - 1}` : '#'}
            className={`flex-1 max-w-[140px] py-2.5 rounded-lg font-medium text-center text-sm transition ${
              hasPrev
                ? 'bg-manga-card text-white hover:bg-manga-surface'
                : 'bg-manga-card/50 text-manga-muted cursor-not-allowed pointer-events-none'
            }`}
          >
            ← Ch. {chapterNumber - 1}
          </Link>
          <span className="text-manga-muted text-sm flex-shrink-0">
            Ch. {chapterNumber}
          </span>
          <Link
            to={hasNext ? `/title/${titleId}/chapter/${chapterNumber + 1}` : '#'}
            className={`flex-1 max-w-[140px] py-2.5 rounded-lg font-medium text-center text-sm transition ${
              hasNext
                ? 'bg-manga-accent text-white hover:bg-manga-accentHover'
                : 'bg-manga-card/50 text-manga-muted cursor-not-allowed pointer-events-none'
            }`}
          >
            Ch. {chapterNumber + 1} →
          </Link>
        </div>
      )}
    </div>
  )
}

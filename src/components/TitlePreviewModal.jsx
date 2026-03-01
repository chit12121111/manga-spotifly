import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { getTitleById } from '../mock/titles'
import { useFavorites } from '../context/FavoritesContext'
import { usePlayer } from '../context/PlayerContext'

export default function TitlePreviewModal({ titleId, onClose }) {
  const navigate = useNavigate()
  const title = getTitleById(titleId)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { setQueue, playTrack } = usePlayer()
  const overlayRef = useRef(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!title) return null

  const chapters = [...(title.chapters || [])].sort((a, b) => b.chapterNumber - a.chapterNumber)
  const firstCh = chapters[0]
  const queueTracks = chapters.map((c) => ({
    id: `${titleId}-ch-${c.chapterNumber}`,
    name: c.title ? `Ch. ${c.chapterNumber} ${c.title}` : `Ch. ${c.chapterNumber}`,
    artistName: title.title,
    imageUrl: title.coverImage,
    duration: '—',
  }))

  const handlePlay = () => {
    if (firstCh) {
      setQueue(queueTracks)
      playTrack({
        id: `${titleId}-ch-${firstCh.chapterNumber}`,
        name: firstCh.title ? `Ch. ${firstCh.chapterNumber} ${firstCh.title}` : `Ch. ${firstCh.chapterNumber}`,
        artistName: title.title,
        imageUrl: title.coverImage,
        duration: '—',
      })
      onClose()
      navigate('/now-playing')
    } else {
      onClose()
      navigate(`/title/${titleId}`)
    }
  }

  const handleGoToTitle = () => {
    onClose()
    navigate(`/title/${titleId}`)
  }

  const handleMyList = () => {
    toggleFavorite(titleId)
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-xl bg-spotify-dark shadow-2xl">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={title.coverImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-spotify-dark via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col min-h-[320px]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition"
            aria-label="ปิด"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>

          <h2 id="preview-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white pr-12 mt-4">
            {title.title}
          </h2>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-spotify-lightGray mt-2">
            <span>อัปเดต: Ch. {title.latestChapterNumber} · {title.updatedAt}</span>
            <span>โดย {title.author}</span>
            {title.viewCount && <span className="text-spotify-green">{title.viewCount} วิว</span>}
          </div>

          <p className="text-white/90 text-sm sm:text-base mt-4 line-clamp-4 max-w-xl">
            {title.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              type="button"
              onClick={handlePlay}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-spotify-green text-black font-semibold hover:bg-spotify-greenHover transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              เล่น
            </button>
            <button
              type="button"
              onClick={handleGoToTitle}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/40 text-white font-medium hover:bg-white/10 transition"
            >
              ดูรายละเอียด
            </button>
            <button
              type="button"
              onClick={handleMyList}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg border font-medium transition ${isFavorite(titleId) ? 'border-spotify-green text-spotify-green bg-spotify-green/10' : 'border-white/40 text-white hover:bg-white/10'}`}
            >
              {isFavorite(titleId) ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  ในรายการของฉันแล้ว
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                  เพิ่มในรายการของฉัน
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

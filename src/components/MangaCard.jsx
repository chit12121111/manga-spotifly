import { Link } from 'react-router-dom'
import { useState, useRef, useCallback } from 'react'

export default function MangaCard({ title: manga, showFavorite = false, isFavorite = false, onToggleFavorite }) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef(null)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (manga.overviewVideo && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [manga.overviewVideo])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [])

  const hasVideo = Boolean(manga.overviewVideo)

  return (
    <Link
      to={`/title/${manga.id}`}
      className="block group"
    >
      <div
        className="relative aspect-[2/3] rounded-lg overflow-hidden bg-spotify-gray shadow-lg group-hover:scale-[1.03] group-hover:shadow-xl transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={manga.coverImage}
          alt={manga.title}
          className={`w-full h-full object-cover transition-all duration-300 ${hasVideo && isHovered ? 'opacity-0' : ''} ${!hasVideo ? 'group-hover:scale-105' : ''}`}
        />
        {hasVideo && (
          <video
            ref={videoRef}
            src={manga.overviewVideo}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-hidden
          />
        )}
        {manga.badge && (
          <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-xs font-semibold bg-spotify-green text-black">
            {manga.badge}
          </span>
        )}
        {showFavorite && (
          <button
            type="button"
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white"
            onClick={(e) => {
              e.preventDefault()
              onToggleFavorite?.(manga.id)
            }}
          >
            {isFavorite ? (
              <svg className="w-5 h-5 text-spotify-green fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
        )}
      </div>
      <p className="mt-2 font-medium text-white text-sm line-clamp-2 group-hover:text-spotify-greenHover transition truncate">
        {manga.title}
      </p>
      <p className="text-spotify-lightGray text-xs mt-0.5">
        Ch. {manga.latestChapterNumber} · {manga.updatedAt}
      </p>
    </Link>
  )
}

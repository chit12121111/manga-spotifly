import { Link } from 'react-router-dom'
import { useState, useRef, useCallback } from 'react'
import { useTitlePreview } from '../context/TitlePreviewContext'

function ViewIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  )
}

/** Card for horizontal scroll – สไตล์ Spotify, เล่นวิดีโอเมื่อชี้, คลิกเปิด popup */
export default function CreatorMangaCard({ manga, className = '' }) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef(null)
  const preview = useTitlePreview()

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

  const handleClick = (e) => {
    if (preview?.openPreview) {
      e.preventDefault()
      preview.openPreview(manga.id)
    }
  }

  const hasVideo = Boolean(manga.overviewVideo)

  const content = (
    <>
      <div
        className="relative aspect-[2/3] rounded-xl overflow-hidden bg-spotify-gray shadow-lg group-hover:shadow-xl group-hover:shadow-spotify-green/10 group-hover:scale-[1.03] transition-all duration-300 ease-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={manga.coverImage}
          alt={manga.title}
          className={`w-full h-full object-cover transition-all duration-300 ${hasVideo && isHovered ? 'opacity-0' : ''} ${!hasVideo ? 'group-hover:scale-110' : ''}`}
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
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-spotify-green text-black z-10 shadow-lg group-hover:shadow-spotify-green/50 transition-shadow duration-300">
            {manga.badge}
          </span>
        )}
      </div>
      <p className="mt-2.5 font-medium text-white text-sm line-clamp-2 group-hover:text-spotify-greenHover transition leading-tight truncate">
        {manga.title}
      </p>
      <p className="text-spotify-lightGray text-xs mt-1.5">
        #{String(manga.latestChapterNumber).padStart(3, '0')} · {manga.author}
      </p>
      <p className="flex items-center gap-1 text-spotify-lightGray text-xs mt-1">
        <ViewIcon className="w-4 h-4 flex-shrink-0" />
        <span>{manga.viewCount ?? '0'}</span>
      </p>
    </>
  )

  if (preview?.openPreview) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`flex-shrink-0 w-32 sm:w-36 md:w-40 block group text-left transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      >
        {content}
      </button>
    )
  }

  return (
    <Link
      to={`/title/${manga.id}`}
      className={`flex-shrink-0 w-32 sm:w-36 md:w-40 block group transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {content}
    </Link>
  )
}

/** Row variant for Popular Manga – สไตล์ Spotify, คลิกเปิด popup */
export function CreatorMangaRow({ manga, rank, className = '' }) {
  const preview = useTitlePreview()

  const handleClick = (e) => {
    if (preview?.openPreview) {
      e.preventDefault()
      preview.openPreview(manga.id)
    }
  }

  const rowContent = (
    <>
      <span className="flex-shrink-0 w-6 text-center text-spotify-lightGray text-sm font-bold tabular-nums">
        {rank}
      </span>
      <div className="flex-shrink-0 w-12 h-[4.5rem] rounded-lg overflow-hidden bg-spotify-gray shadow-md group-hover:shadow-lg transition-all duration-300">
        <img
          src={manga.coverImage}
          alt={manga.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-white text-sm truncate group-hover:text-spotify-greenHover leading-tight">
          {manga.title}
        </p>
        <p className="text-spotify-lightGray text-xs truncate mt-0.5">{manga.author}</p>
      </div>
      <p className="flex items-center gap-1 text-spotify-lightGray text-xs flex-shrink-0 tabular-nums">
        <ViewIcon className="w-3.5 h-3.5 opacity-80" />
        <span>{manga.viewCount ?? '0'}</span>
      </p>
    </>
  )

  if (preview?.openPreview) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/10 active:bg-white/5 transition-colors duration-200 group w-full text-left ${className}`}
      >
        {rowContent}
      </button>
    )
  }

  return (
    <Link
      to={`/title/${manga.id}`}
      className={`flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/10 active:bg-white/5 transition-colors duration-200 group ${className}`}
    >
      {rowContent}
    </Link>
  )
}

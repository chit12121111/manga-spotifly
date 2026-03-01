import { useParams, Navigate, useNavigate, Link } from 'react-router-dom'
import { getTitleById } from '../mock/titles'
import ChapterList from '../components/ChapterList'
import { useFavorites } from '../context/FavoritesContext'
import { useReadingProgress } from '../context/ReadingProgressContext'
import { usePlayer } from '../context/PlayerContext'

function chapterToTrack(titleId, titleTitle, coverImage, ch) {
  return {
    id: `${titleId}-ch-${ch.chapterNumber}`,
    name: ch.title ? `Ch. ${ch.chapterNumber} ${ch.title}` : `Ch. ${ch.chapterNumber}`,
    artistName: titleTitle,
    imageUrl: coverImage,
    duration: '—',
  }
}

export default function TitlePage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const title = getTitleById(id)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { getLastRead } = useReadingProgress()
  const { playTrack, setQueue } = usePlayer()
  const lastCh = getLastRead(id)

  if (!title) {
    return <Navigate to="/" replace />
  }

  const chapters = [...(title.chapters || [])].sort(
    (a, b) => b.chapterNumber - a.chapterNumber
  )

  const queueTracks = chapters.map((c) => chapterToTrack(id, title.title, title.coverImage, c))
  const playChapter = (ch) => {
    setQueue(queueTracks)
    playTrack(chapterToTrack(id, title.title, title.coverImage, ch))
    navigate('/now-playing')
  }

  return (
    <div className="p-4 sm:p-6 pb-24 md:pb-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-shrink-0 w-36 sm:w-40 md:w-48 mx-auto md:mx-0">
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-spotify-gray shadow-lg">
            {title.overviewVideo ? (
              <video
                src={title.overviewVideo}
                poster={title.coverImage}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={title.coverImage}
                alt={title.title}
                className="w-full h-full object-cover"
              />
            )}
            {title.badge && (
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-semibold bg-spotify-green text-black z-10">
                {title.badge}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-white">{title.title}</h1>
          <p className="text-spotify-lightGray text-sm mt-2 line-clamp-3">{title.description}</p>
          <p className="text-spotify-lightGray text-xs mt-2">
            Latest: Ch. {title.latestChapterNumber} · {title.updatedAt}
          </p>
          {title.author && (
            <p className="mt-2">
              <Link
                to="/profile"
                className="text-sm text-spotify-lightGray hover:text-white hover:underline transition"
              >
                โดย {title.author}
              </Link>
              <span className="text-spotify-lightGray text-xs ml-1">· </span>
              <Link
                to="/profile"
                className="text-xs text-spotify-green hover:text-spotify-greenHover transition"
              >
                ติดตามโปรไฟล์
              </Link>
            </p>
          )}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mt-4">
            {lastCh && (
              <button
                type="button"
                onClick={() => {
                  const ch = chapters.find((c) => c.chapterNumber === lastCh)
                  if (ch) playChapter(ch)
                }}
                className="px-4 py-2 rounded-full bg-spotify-green text-black font-medium hover:bg-spotify-greenHover transition text-sm"
              >
                Continue listening Ch.{lastCh}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                const ch = chapters.find((c) => c.chapterNumber === 1)
                if (ch) playChapter(ch)
              }}
              className="px-4 py-2 rounded-full bg-spotify-green text-black font-medium hover:bg-spotify-greenHover transition text-sm"
            >
              Listen from Ch.1
            </button>
            <button
              type="button"
              onClick={() => {
                const ch = chapters.find((c) => c.chapterNumber === title.latestChapterNumber)
                if (ch) playChapter(ch)
              }}
              className="px-4 py-2 rounded-full bg-spotify-gray text-white font-medium hover:bg-white/10 border border-white/10 transition text-sm"
            >
              Latest track
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(id)}
              className="p-2 rounded-full bg-transparent hover:bg-white/10 text-white"
              title={isFavorite(id) ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              {isFavorite(id) ? (
                <svg className="w-5 h-5 text-spotify-green fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <section className="mt-8 pt-6 border-t border-white/10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Tracks</h2>
        <ChapterList titleId={id} titleTitle={title.title} coverImage={title.coverImage} chapters={chapters} />
      </section>
    </div>
  )
}

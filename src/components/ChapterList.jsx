import { useNavigate } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext'

/** Build a track object from a chapter for the player */
function chapterToTrack(titleId, titleTitle, coverImage, ch) {
  return {
    id: `${titleId}-ch-${ch.chapterNumber}`,
    name: ch.title ? `Ch. ${ch.chapterNumber} ${ch.title}` : `Ch. ${ch.chapterNumber}`,
    artistName: titleTitle,
    imageUrl: coverImage,
    duration: getChapterDuration(ch),
  }
}

/** Format duration for display (e.g. 3:45). Uses ch.duration or generates from chapter number. */
function getChapterDuration(ch) {
  if (ch.duration) return ch.duration
  const min = 2 + (ch.chapterNumber % 3)
  const sec = (ch.chapterNumber * 11) % 60
  return `${min}:${String(sec).padStart(2, '0')}`
}

export default function ChapterList({ titleId, titleTitle, coverImage, chapters }) {
  const navigate = useNavigate()
  const { playTrack, setQueue } = usePlayer()

  const handlePlay = (ch) => {
    const queue = chapters.map((c) => chapterToTrack(titleId, titleTitle, coverImage, c))
    const track = chapterToTrack(titleId, titleTitle, coverImage, ch)
    setQueue(queue)
    playTrack(track)
    navigate('/now-playing')
  }

  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-white/10 text-spotify-lightGray text-sm">
          <th className="pb-3 font-normal">Title</th>
          <th className="pb-3 font-normal hidden sm:table-cell">Date</th>
          <th className="pb-3 font-normal text-right w-16">Time</th>
          <th className="pb-3 font-normal text-right w-20 sm:w-24">Status</th>
        </tr>
      </thead>
      <tbody>
        {chapters.map((ch) => (
          <tr
            key={ch.chapterNumber}
            role="button"
            tabIndex={0}
            onClick={() => handlePlay(ch)}
            onKeyDown={(e) => e.key === 'Enter' && handlePlay(ch)}
            className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
          >
            <td className="py-3">
              <div className="flex items-center gap-3">
                <img src={coverImage} alt="" className="w-10 h-10 rounded flex-shrink-0 object-cover" />
                <div className="min-w-0">
                  <p className="text-white font-medium truncate">
                    Ch. {ch.chapterNumber}
                    {ch.title ? ` ${ch.title}` : ''}
                  </p>
                  <p className="text-spotify-lightGray text-sm truncate">{titleTitle}</p>
                </div>
              </div>
            </td>
            <td className="py-3 text-spotify-lightGray text-sm hidden sm:table-cell">{ch.releaseDate}</td>
            <td className="py-3 text-spotify-lightGray text-sm text-right">{getChapterDuration(ch)}</td>
            <td className="py-3 text-right">
              {ch.isFree ? (
                <span className="text-xs text-spotify-green font-medium">FREE</span>
              ) : (
                <span className="text-spotify-lightGray text-sm">Locked</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

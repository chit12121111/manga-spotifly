import { Link } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext'

export default function NowPlayingPage() {
  const { currentTrack, isPlaying, progress, setProgress, volume, setVolume, playPause, nextTrack, prevTrack, queue, playTrack } = usePlayer()

  return (
    <div className="fixed inset-0 z-50 bg-spotify-dark flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-2xl mb-8">
          {currentTrack ? <img src={currentTrack.imageUrl} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-spotify-gray"/>}
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{currentTrack?.name || 'No track'}</h1>
          <p className="text-spotify-lightGray mt-1">{currentTrack?.artistName || '—'}</p>
        </div>
        <div className="w-full max-w-xl space-y-4">
          <input type="range" min="0" max="100" value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full h-2 accent-spotify-green" />
          <div className="flex items-center justify-center gap-6">
            <button onClick={prevTrack} className="p-2 text-white hover:text-spotify-greenHover"><svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></button>
            <button onClick={playPause} className="p-4 rounded-full bg-white text-black hover:scale-105">
              {isPlaying ? <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="w-12 h-12 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
            </button>
            <button onClick={nextTrack} className="p-2 text-white hover:text-spotify-greenHover"><svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg></button>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-spotify-lightGray" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="flex-1 accent-spotify-green" />
          </div>
        </div>
      </div>
      <div className="hidden md:block w-80 border-l border-white/10 overflow-y-auto p-4">
        <h3 className="text-white font-semibold mb-4">Queue</h3>
        <div className="space-y-2">
          {queue.map((t) => (
            <button key={t.id} type="button" onClick={() => playTrack(t)} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 w-full text-left">
              <img src={t.imageUrl} alt="" className="w-10 h-10 rounded flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm truncate">{t.name}</p>
                <p className="text-spotify-lightGray text-xs truncate">{t.artistName}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Link to="/" className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </Link>
    </div>
  )
}

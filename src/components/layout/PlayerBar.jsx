import { Link, useNavigate } from 'react-router-dom'
import { usePlayer } from '../../context/PlayerContext'

export default function PlayerBar() {
  const navigate = useNavigate()
  const { currentTrack, isPlaying, progress, setProgress, volume, setVolume, playPause, nextTrack, prevTrack } = usePlayer()

  return (
    <footer className="h-16 md:h-[90px] bg-spotify-gray/95 backdrop-blur-md border-t border-white/10 flex items-center justify-between pl-2 pr-6 md:pl-4 md:pr-16 gap-2 md:gap-4 flex-shrink-0 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1 max-w-[30%]">
        {currentTrack ? (
          <>
            <img src={currentTrack.imageUrl} alt="" className="w-12 h-12 md:w-14 md:h-14 rounded object-cover flex-shrink-0" />
            <div className="min-w-0">
              <Link to="/now-playing" className="text-white font-medium truncate block hover:underline">{currentTrack.name}</Link>
              <span className="text-spotify-lightGray text-sm truncate block">{currentTrack.artistName}</span>
            </div>
          </>
        ) : (
          <span className="text-spotify-lightGray text-sm">No track selected</span>
        )}
      </div>
      <div className="flex flex-col items-center gap-2 flex-1 max-w-[40%]">
        <div className="flex items-center gap-4">
          <button onClick={prevTrack} className="p-2 text-white hover:text-spotify-greenHover hover:scale-110 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          <button onClick={playPause} className="p-3 rounded-full bg-white text-black hover:scale-105 transition">
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-8 h-8 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <button onClick={nextTrack} className="p-2 text-white hover:text-spotify-greenHover hover:scale-110 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-spotify-lightGray w-8">0:00</span>
          <input type="range" min="0" max="100" value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="flex-1 h-1 accent-spotify-green" />
          <span className="text-xs text-spotify-lightGray w-8">{currentTrack?.duration || '0:00'}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 max-w-[30%] justify-end">
        <button onClick={() => navigate('/now-playing')} className="p-2 rounded-full hover:bg-white/10 text-spotify-lightGray hover:text-white" title="Queue">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>
        </button>
        <button className="p-2 rounded-full hover:bg-white/10 text-spotify-lightGray hover:text-white" title="Connect to a device" onClick={() => alert('Connect to a device (demo)')}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        </button>
        <svg className="w-5 h-5 text-spotify-lightGray" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
        <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-24 accent-spotify-green" />
      </div>
    </footer>
  )
}

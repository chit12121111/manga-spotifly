import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { playlists } from '../mock/playlists'
import { tracks } from '../mock/tracks'
import { usePlayer } from '../context/PlayerContext'

export default function PlaylistPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const playlist = playlists.find((p) => p.id === id)
  const { playTrack, setQueue } = usePlayer()

  if (!playlist) return <Navigate to="/library" replace />

  const playlistTracks = id === 'p1' ? [] : tracks.slice(0, playlist.trackCount || 8)

  const handlePlay = () => {
    if (playlistTracks.length > 0) {
      setQueue?.(playlistTracks)
      playTrack(playlistTracks[0])
      navigate('/now-playing')
    }
  }

  return (
    <div className="pb-24 md:pb-6">
      <div className="relative pt-6 pb-6 px-6 bg-gradient-to-b from-spotify-green/20 to-transparent">
        <div className="flex gap-6 items-end">
          <div className="w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl">
            <img src={playlist.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-white/80 uppercase tracking-wider mb-2">Playlist</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 truncate">{playlist.name}</h1>
            <p className="text-spotify-lightGray">{playlist.trackCount || 0} tracks</p>
            {playlistTracks.length > 0 && (
              <button
                onClick={handlePlay}
                className="mt-6 px-8 py-3 rounded-full bg-spotify-green text-black font-bold hover:bg-spotify-greenHover hover:scale-105 transition"
              >
                Play
              </button>
            )}
          </div>
        </div>
      </div>
      {playlistTracks.length > 0 ? (
        <div className="px-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-spotify-lightGray text-sm">
                <th className="pb-3 font-normal w-10">#</th>
                <th className="pb-3 font-normal">Title</th>
                <th className="pb-3 font-normal hidden md:table-cell">Album</th>
                <th className="pb-3 font-normal text-right w-16">Duration</th>
              </tr>
            </thead>
            <tbody>
              {playlistTracks.map((t, i) => (
                <tr
                  key={t.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => playTrack(t)}
                  onKeyDown={(e) => e.key === 'Enter' && playTrack(t)}
                  className="border-b border-white/5 hover:bg-white/5 group cursor-pointer"
                >
                  <td className="py-3 text-spotify-lightGray w-10">{i + 1}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img src={t.imageUrl} alt="" className="w-10 h-10 rounded" />
                      <div>
                        <p className="text-white font-medium">{t.name}</p>
                        <p className="text-spotify-lightGray text-sm">{t.artistName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-spotify-lightGray hidden md:table-cell">{t.albumName}</td>
                  <td className="py-3 text-spotify-lightGray text-right">{t.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-6 py-12 text-center text-spotify-lightGray">
          <p>This playlist is empty. Add titles to start listening.</p>
        </div>
      )}
    </div>
  )
}

import { Link } from 'react-router-dom'
import { useState } from 'react'
import { playlists } from '../mock/playlists'
import { titles } from '../mock/titles'

const PROFILE_USER = {
  name: 'Chitban',
}

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const userPlaylists = playlists.filter((p) => p.id !== 'p1')
  const publicPlaylistCount = userPlaylists.length
  const userTitles = titles.slice(0, 4)

  return (
    <div className="pb-24 md:pb-8">
      {/* Artist-style header */}
      <div className="relative h-64 sm:h-72 md:h-80 bg-gradient-to-b from-spotify-green/30 to-spotify-dark px-4 sm:px-6 flex items-end pb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 w-full max-w-4xl mx-auto">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-spotify-gray flex items-center justify-center flex-shrink-0 border-4 border-black/20 shadow-xl">
            <svg className="w-16 h-16 sm:w-20 sm:h-20 text-white/40" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div className="text-center sm:text-left min-w-0 flex-1">
            <p className="text-spotify-lightGray text-xs uppercase tracking-wider mb-1">โปรไฟล์</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white truncate">{PROFILE_USER.name}</h1>
            <p className="text-spotify-lightGray text-sm mt-1">{publicPlaylistCount} เพลย์ลิสต์สาธารณะ</p>
            <div className="flex flex-wrap items-center gap-3 mt-4 justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => setIsFollowing((f) => !f)}
                className={`px-5 py-2.5 rounded-full border font-medium transition ${isFollowing ? 'border-spotify-lightGray text-spotify-lightGray' : 'border-white/30 text-white hover:border-white'}`}
              >
                {isFollowing ? 'ติดตามแล้ว' : 'ติดตาม'}
              </button>
              <Link
                to="/settings"
                className="p-2.5 rounded-full hover:bg-white/10 text-spotify-lightGray hover:text-white transition"
                title="การตั้งค่า"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.04.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* ผลงานที่เกี่ยวข้อง (จาก titles) */}
        {userTitles.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">ผลงาน</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {userTitles.map((t) => (
                <Link key={t.id} to={`/title/${t.id}`} className="flex-shrink-0 group">
                  <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden bg-spotify-gray group-hover:scale-[1.02] transition shadow-lg">
                    <img src={t.coverImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white font-medium mt-2 truncate w-36 sm:w-40 text-sm">{t.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

      {/* Public Playlists */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">เพลย์ลิสต์สาธารณะ</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {userPlaylists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="block group"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-spotify-gray shadow-lg group-hover:scale-[1.02] transition duration-200">
                <img
                  src={playlist.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 font-medium text-white text-sm line-clamp-2 group-hover:text-spotify-greenHover transition">
                {playlist.name}
              </p>
              <p className="text-spotify-lightGray text-xs mt-1">โดย {PROFILE_USER.name}</p>
            </Link>
          ))}
        </div>
        {userPlaylists.length === 0 && (
          <p className="text-spotify-lightGray py-8">ยังไม่มีเพลย์ลิสต์สาธารณะ</p>
        )}
      </section>
      </div>
    </div>
  )
}

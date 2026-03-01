import { Link } from 'react-router-dom'

export default function MorePage() {
  return (
    <div className="p-4 sm:p-6 pb-24 md:pb-8 max-w-xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-6">More</h1>
      <nav className="space-y-0.5">
        <Link
          to="/profile"
          className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/10 text-white transition"
        >
          <span className="text-spotify-lightGray">โปรไฟล์</span>
          <svg className="w-5 h-5 text-spotify-lightGray" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        </Link>
        <Link
          to="/settings"
          className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/10 text-white transition"
        >
          <span className="text-spotify-lightGray">การตั้งค่า</span>
          <svg className="w-5 h-5 text-spotify-lightGray" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        </Link>
        <a
          href="#"
          className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/10 text-white transition"
          onClick={(e) => e.preventDefault()}
        >
          <span className="text-spotify-lightGray">Language</span>
          <span className="text-xs text-spotify-lightGray">EN</span>
        </a>
        <a
          href="#"
          className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/10 text-white transition"
          onClick={(e) => e.preventDefault()}
        >
          <span className="text-spotify-lightGray">About / Official SNS</span>
        </a>
      </nav>
      <p className="text-spotify-lightGray text-sm mt-10">Manga Spotifly – Demo. Spotify-style UI + Manga content.</p>
    </div>
  )
}

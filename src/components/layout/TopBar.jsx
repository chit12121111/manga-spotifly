import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

export default function TopBar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    if (!showProfileMenu) return
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false)
      }
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowProfileMenu(false)
    }
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [showProfileMenu])

  return (
    <header className="h-14 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-end px-4 sticky top-0 z-20 transition-colors duration-200">
      <div className="flex items-center gap-2">
        <Link to="/search" className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors duration-200" title="Search">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        </Link>
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full bg-black hover:bg-spotify-gray transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-spotify-gray border border-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <span className="text-white font-medium text-sm hidden sm:inline">User</span>
            <svg className={`w-4 h-4 text-white/70 transition ${showProfileMenu ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 py-2 bg-spotify-gray/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 animate-fade-in">
              <Link to="/profile" className="block px-4 py-2 text-white hover:bg-white/10 transition-colors duration-150" onClick={() => setShowProfileMenu(false)}>โปรไฟล์</Link>
              <Link to="/settings" className="block px-4 py-2 text-white hover:bg-white/10 transition-colors duration-150" onClick={() => setShowProfileMenu(false)}>การตั้งค่า</Link>
              <Link to="/more" className="block px-4 py-2 text-white hover:bg-white/10 transition-colors duration-150" onClick={() => setShowProfileMenu(false)}>More</Link>
              <Link to="/login" className="block px-4 py-2 text-white hover:bg-white/10 transition-colors duration-150" onClick={() => setShowProfileMenu(false)}>เข้าสู่ระบบ</Link>
              <button className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors duration-150" onClick={() => setShowProfileMenu(false)}>Log out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

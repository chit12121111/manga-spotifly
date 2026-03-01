import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-spotify-gray border-t border-white/10 flex items-center justify-around z-30 pb-[env(safe-area-inset-bottom)]">
      <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 py-2 ${isActive ? 'text-white' : 'text-spotify-lightGray'}`}>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z"/></svg>
        <span className="text-xs">Home</span>
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 py-2 ${isActive ? 'text-white' : 'text-spotify-lightGray'}`}>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"/></svg>
        <span className="text-xs">Search</span>
      </NavLink>
      <NavLink to="/library" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 py-2 ${isActive ? 'text-white' : 'text-spotify-lightGray'}`}>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/></svg>
        <span className="text-xs">Library</span>
      </NavLink>
      <NavLink to="/more" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 py-2 ${isActive ? 'text-white' : 'text-spotify-lightGray'}`}>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        <span className="text-xs">More</span>
      </NavLink>
    </nav>
  )
}

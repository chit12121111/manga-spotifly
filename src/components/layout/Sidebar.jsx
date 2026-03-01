import { NavLink } from 'react-router-dom'
import { titles } from '../../mock/titles'

const linkClass = (isActive, collapsed) =>
  `flex items-center rounded-lg transition-all duration-200 ${
    collapsed ? 'justify-center p-2.5' : 'gap-3 py-2.5 pr-3 pl-3'
  } ${isActive ? 'bg-white/10 text-white' : 'text-spotify-lightGray hover:text-white hover:bg-white/5'}`

const SIDEBAR_TITLES = titles.slice(0, 5)

export default function Sidebar({ collapsed = false, onToggle }) {
  return (
    <aside className={`bg-black flex flex-col h-full transition-[width] duration-200 border-r border-white/5 ${collapsed ? 'w-16 min-w-[64px]' : 'w-60 min-w-[240px]'}`}>
      <div className={`shrink-0 flex items-center ${collapsed ? 'flex-col gap-2 p-3' : 'justify-between gap-2 p-4 pr-3'}`}>
        <NavLink to="/" className={`transition-opacity hover:opacity-90 ${collapsed ? 'flex justify-center' : 'flex-1 min-w-0'}`}>
          {collapsed ? (
            <div className="w-10 h-10 rounded-lg bg-spotify-green flex items-center justify-center">
              <span className="text-lg font-bold text-black">M</span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-white tracking-tight truncate">Manga Spotifly</span>
          )}
        </NavLink>
        <button
          type="button"
          onClick={onToggle}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-spotify-lightGray hover:text-white transition-all duration-200 shrink-0"
          title={collapsed ? 'ขยายแถบข้าง' : 'ย่อแถบข้าง'}
          aria-label={collapsed ? 'ขยายแถบข้าง' : 'ย่อแถบข้าง'}
        >
          <svg className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
      </div>
      <nav className={`flex-1 flex flex-col min-h-0 pt-2 ${collapsed ? 'px-2' : 'px-3'}`}>
        <div className="space-y-0.5 shrink-0">
          <NavLink to="/" className={({ isActive }) => linkClass(isActive, collapsed)} title="Home">
            <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            {!collapsed && <span>Home</span>}
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => linkClass(isActive, collapsed)} title="Search">
            <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            {!collapsed && <span>Search</span>}
          </NavLink>
          <NavLink to="/library" className={({ isActive }) => linkClass(isActive, collapsed)} title="Your Library">
            <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/></svg>
            {!collapsed && <span>Your Library</span>}
          </NavLink>
        </div>
        <div className={`shrink-0 mt-4 ${collapsed ? 'border-t border-white/10 pt-3 mt-3' : 'border-t border-white/10 pt-4 mt-4'} space-y-0.5`}>
          <button
            type="button"
            onClick={() => alert('Create playlist (demo)')}
            className={linkClass(false, collapsed)}
          >
            <span className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-lg leading-none shrink-0">+</span>
            {!collapsed && <span>Create Playlist</span>}
          </button>
          <NavLink to="/favorites" className={({ isActive }) => linkClass(isActive, collapsed)} title="Liked Titles">
            <span className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shrink-0 text-white text-xs">♥</span>
            {!collapsed && <span>Liked Titles</span>}
          </NavLink>
        </div>
        <div className="flex-1 overflow-y-auto py-3 scrollbar-web min-h-0">
          {SIDEBAR_TITLES.map((title) => (
            <NavLink
              key={title.id}
              to={`/title/${title.id}`}
              className={({ isActive }) => linkClass(isActive, collapsed)}
              title={title.title}
            >
              <img src={title.coverImage} alt="" className="w-6 h-6 rounded flex-shrink-0 object-cover" />
              {!collapsed && <span className="truncate">{title.title}</span>}
            </NavLink>
          ))}
        </div>
        <div className="shrink-0 pt-2 border-t border-white/10">
          <NavLink to="/more" className={({ isActive }) => linkClass(isActive, collapsed)} title="More">
            <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
            {!collapsed && <span>More</span>}
          </NavLink>
        </div>
      </nav>
    </aside>
  )
}

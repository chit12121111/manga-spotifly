import { Outlet } from 'react-router-dom'

export default function MainContent() {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-spotify-gray/40 to-spotify-dark min-h-0 min-w-0 pb-[calc(4rem+env(safe-area-inset-bottom,0px))] md:pb-24 scrollbar-web [scrollbar-gutter:stable]">
      <Outlet />
    </main>
  )
}

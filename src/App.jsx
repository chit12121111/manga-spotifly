import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PlayerProvider } from './context/PlayerContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { ReadingProgressProvider } from './context/ReadingProgressContext'
import { TitlePreviewProvider } from './context/TitlePreviewContext'
import TopBar from './components/layout/TopBar'
import Sidebar from './components/layout/Sidebar'
import MainContent from './components/layout/MainContent'
import PlayerBar from './components/layout/PlayerBar'
import BottomNav from './components/layout/BottomNav'
import HomePage from './pages/HomePage'
import TitlePage from './pages/TitlePage'
import ReaderPage from './pages/ReaderPage'
import SearchPage from './pages/SearchPage'
import LibraryPage from './pages/LibraryPage'
import FavoritesPage from './pages/FavoritesPage'
import PlaylistPage from './pages/PlaylistPage'
import MorePage from './pages/MorePage'
import NowPlayingPage from './pages/NowPlayingPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import PickPlanPage from './pages/PickPlanPage'
import OnboardingPage from './pages/OnboardingPage'
import NotFoundPage from './pages/NotFoundPage'

const SIDEBAR_COLLAPSED_KEY = 'manga_spotifly_sidebar_collapsed'

function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SIDEBAR_COLLAPSED_KEY) ?? 'false')
    } catch {
      return false
    }
  })
  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  return (
    <div className="h-screen min-h-[100dvh] flex flex-col bg-spotify-dark overflow-x-hidden">
      <div className="flex flex-1 min-h-0 min-w-0">
        <div className="hidden md:block flex-shrink-0 relative z-10">
          <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
        </div>
        <div className="flex-1 flex flex-col min-w-0 relative z-0 isolate">
          <TopBar />
          <MainContent />
        </div>
      </div>
      <PlayerBar />
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <PlayerProvider>
      <FavoritesProvider>
        <ReadingProgressProvider>
          <TitlePreviewProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/premium" element={<PickPlanPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/now-playing" element={<NowPlayingPage />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="title/:id" element={<TitlePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="library" element={<LibraryPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="playlist/:id" element={<PlaylistPage />} />
              <Route path="more" element={<MorePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="artist/:id" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="title/:id/chapter/:num" element={<ReaderPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </TitlePreviewProvider>
        </ReadingProgressProvider>
      </FavoritesProvider>
    </PlayerProvider>
  )
}

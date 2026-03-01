import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { getTitleById } from '../mock/titles'
import MangaCard from '../components/MangaCard'
import { useFavorites } from '../context/FavoritesContext'

const TABS = [
  { id: 'titles', label: 'Titles' },
  { id: 'collections', label: 'Collections' },
]

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('titles')
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()

  const favoriteTitles = useMemo(() => {
    return favoriteIds.map((id) => getTitleById(id)).filter(Boolean)
  }, [favoriteIds])

  return (
    <div className="p-4 sm:p-6 pb-24 md:pb-8 max-w-6xl mx-auto">
      <div className="flex gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeTab === tab.id ? 'bg-white text-black' : 'text-spotify-lightGray hover:text-white bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'titles' && (
        <>
          {favoriteTitles.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 text-center">
              <p className="text-spotify-lightGray text-lg">Save titles to your library</p>
              <p className="text-spotify-lightGray text-sm mt-2">Add series from Home or Search to see them here.</p>
              <div className="flex gap-3 mt-6">
                <Link to="/" className="px-5 py-2.5 rounded-full bg-spotify-green text-black font-medium hover:bg-spotify-greenHover transition">
                  Browse Home
                </Link>
                <Link to="/search" className="px-5 py-2.5 rounded-full bg-spotify-gray text-white font-medium hover:bg-white/10 transition border border-white/10">
                  Search
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {favoriteTitles.map((title) => (
                <MangaCard
                  key={title.id}
                  title={title}
                  showFavorite
                  isFavorite={isFavorite(title.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'collections' && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 text-center">
          <p className="text-spotify-lightGray text-lg">Create playlists to organize titles</p>
          <p className="text-spotify-lightGray text-sm mt-2">Use Create Playlist in the sidebar to get started.</p>
        </div>
      )}
    </div>
  )
}

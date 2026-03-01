import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getTitleById } from '../mock/titles'
import MangaCard from '../components/MangaCard'
import { useFavorites } from '../context/FavoritesContext'

export default function FavoritesPage() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()

  const favoriteTitles = useMemo(() => {
    return favoriteIds.map((id) => getTitleById(id)).filter(Boolean)
  }, [favoriteIds])

  if (favoriteTitles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center p-6 pb-24 md:pb-8">
        <p className="text-spotify-lightGray text-lg">You have no favorites yet</p>
        <p className="text-spotify-lightGray text-sm mt-2">Add series from Home or Search to listen to them here.</p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-full bg-spotify-green text-black font-medium hover:bg-spotify-greenHover transition"
          >
            Browse Home
          </Link>
          <Link
            to="/search"
            className="px-5 py-2.5 rounded-full bg-spotify-gray text-white font-medium hover:bg-white/10 transition border border-white/10"
          >
            Search
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 pb-24 md:pb-8 max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">Favorites</h1>
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
    </div>
  )
}

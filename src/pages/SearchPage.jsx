import { useState, useMemo } from 'react'
import { titles } from '../mock/titles'
import MangaCard from '../components/MangaCard'
import { useFavorites } from '../context/FavoritesContext'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return titles
    return titles.filter((t) => t.title.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="p-4 sm:p-6 pb-24 md:pb-8 max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">Search</h1>
      <input
        type="search"
        placeholder="Search manga..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-xl px-4 py-3 rounded-full bg-spotify-gray border border-transparent text-white placeholder-spotify-lightGray focus:outline-none focus:ring-2 focus:ring-spotify-green"
      />

      {results.length === 0 ? (
        <div className="mt-16 text-center py-12">
          <p className="text-spotify-lightGray text-lg">No results found</p>
          <p className="text-spotify-lightGray text-sm mt-2">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mt-6">
          {results.map((title) => (
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
    </div>
  )
}

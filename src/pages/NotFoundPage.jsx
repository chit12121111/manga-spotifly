import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center p-6">
      <h1 className="text-5xl sm:text-6xl font-bold text-white mb-3">404</h1>
      <p className="text-spotify-lightGray text-lg">Page not found</p>
      <Link
        to="/"
        className="mt-8 px-6 py-2.5 rounded-full bg-spotify-green text-black font-medium hover:bg-spotify-greenHover transition"
      >
        Go Home
      </Link>
    </div>
  )
}

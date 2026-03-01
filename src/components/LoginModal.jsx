import { useEffect } from 'react'

export default function LoginModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div
        className="bg-manga-surface rounded-xl shadow-xl w-full max-w-md border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 id="login-modal-title" className="text-lg font-semibold text-white">
            Login
          </h2>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-white/10 text-manga-muted hover:text-white"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm text-manga-muted mb-1">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="Please enter an email address."
              className="w-full px-3 py-2 rounded-lg bg-manga-card border border-white/10 text-white placeholder-manga-muted focus:border-manga-accent focus:outline-none text-sm"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm text-manga-muted mb-1">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="Please enter a password."
              className="w-full px-3 py-2 rounded-lg bg-manga-card border border-white/10 text-white placeholder-manga-muted focus:border-manga-accent focus:outline-none text-sm"
            />
            <button
              type="button"
              className="mt-1 text-sm text-manga-accent hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Forget Password?
            </button>
          </div>
          <button
            type="button"
            className="w-full py-2.5 rounded-lg bg-manga-accent text-white font-medium hover:bg-manga-accentHover transition"
            onClick={(e) => e.preventDefault()}
          >
            Login
          </button>
          <p className="text-center text-sm text-manga-muted">
            Sign up here
          </p>

          <div className="relative">
            <span className="block text-center text-sm text-manga-muted">or</span>
          </div>

          <p className="text-xs text-manga-muted text-center">
            Log in with a social media account
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-manga-card border border-white/10 text-white text-sm hover:bg-manga-surface transition"
              onClick={(e) => e.preventDefault()}
            >
              Sign in with Apple
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-manga-card border border-white/10 text-white text-sm hover:bg-manga-surface transition"
              onClick={(e) => e.preventDefault()}
            >
              Login with Google
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-manga-card border border-white/10 text-white text-sm hover:bg-manga-surface transition"
              onClick={(e) => e.preventDefault()}
            >
              Login with Facebook
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-manga-card border border-white/10 text-white text-sm hover:bg-manga-surface transition"
              onClick={(e) => e.preventDefault()}
            >
              Login with X
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

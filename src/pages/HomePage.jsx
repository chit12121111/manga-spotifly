import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { titles } from '../mock/titles'
import CreatorMangaCard, { CreatorMangaRow } from '../components/CreatorMangaCard'

// Hero carousel – 5 สไลด์ มีวิดีโอ พอจบแล้วเลื่อนอัตโนมัติ | textTheme: 'light' = พื้นสว่างใช้ข้อความสีดำ
const CAROUSEL_SLIDES = [
  {
    title: 'Manga Spotifly',
    subtitle: 'Listen to the best manga – Spotify-style experience.',
    className: 'bg-gradient-to-br from-spotify-green/95 via-spotify-green to-spotify-greenHover',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    textTheme: 'light',
  },
  {
    title: 'Continue Listening',
    subtitle: 'Pick up where you left off, anytime.',
    className: 'bg-gradient-to-br from-spotify-gray via-spotify-dark to-black',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    textTheme: 'dark',
  },
  {
    title: 'Discover New Series',
    subtitle: 'Explore trending manga and new releases.',
    className: 'bg-gradient-to-br from-spotify-green/80 via-spotify-dark to-black',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    textTheme: 'dark',
  },
  {
    title: 'Your Library',
    subtitle: 'All your favorites in one place.',
    className: 'bg-gradient-to-br from-spotify-gray via-spotify-dark to-black',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    textTheme: 'dark',
  },
  {
    title: 'Playlists & Collections',
    subtitle: 'Create playlists and organize your listening.',
    className: 'bg-gradient-to-br from-spotify-green/80 via-spotify-dark to-black',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    textTheme: 'dark',
  },
]

export default function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [popularTab, setPopularTab] = useState('7days')
  const [heroTextDark, setHeroTextDark] = useState(false) // true = ใช้ข้อความสีดำ (พื้นสว่าง)
  const updatesScrollRef = useRef(null)
  const videoRef = useRef(null)
  const sampleIntervalRef = useRef(null)
  const updatesList = titles
  const popularList = [...titles].sort((a, b) => {
    const parse = (v) => {
      const s = String(v || '0').replace(/,/g, '')
      const num = parseFloat(s) || 0
      if (/K/i.test(s)) return num * 1000
      if (/M/i.test(s)) return num * 1000000
      return num
    }
    return parse(b.viewCount) - parse(a.viewCount)
  })

  // ตรวจจับความสว่างจากวิดีโออัตโนมัติ → สว่างใช้ข้อความดำ
  useEffect(() => {
    const slide = CAROUSEL_SLIDES[carouselIndex]
    const hasVideo = !!slide?.videoUrl
    if (!hasVideo) {
      setHeroTextDark(slide?.textTheme === 'light')
      return
    }
    setHeroTextDark(slide?.textTheme === 'light')

    const sample = () => {
      const video = videoRef.current
      if (!video || video.readyState < 2 || video.videoWidth === 0) return
      try {
        const canvas = document.createElement('canvas')
        const w = 32
        const h = 32
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const sw = Math.max(1, Math.floor(video.videoWidth * 0.25))
        const sh = video.videoHeight
        ctx.drawImage(video, 0, 0, sw, sh, 0, 0, w, h)
        const data = ctx.getImageData(0, 0, w, h).data
        let sum = 0
        let count = 0
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const a = data[i + 3]
          if (a < 128) continue
          sum += 0.299 * r + 0.587 * g + 0.114 * b
          count++
        }
        const avg = count > 0 ? sum / count : 0
        setHeroTextDark(avg > 140)
      } catch (_) {
        setHeroTextDark(slide?.textTheme === 'light')
      }
    }

    sampleIntervalRef.current = setInterval(sample, 400)
    sample()
    return () => {
      if (sampleIntervalRef.current) {
        clearInterval(sampleIntervalRef.current)
        sampleIntervalRef.current = null
      }
    }
  }, [carouselIndex])

  return (
    <div className="flex flex-col min-h-full min-w-0 overflow-x-hidden pb-24 md:pb-8 px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      {/* Hero – ความกว้างขยายตามจอใหญ่ ลดพื้นเทา */}
      <div className="w-full max-w-7xl xl:max-w-[1500px] 2xl:max-w-[1700px] mx-auto">
      <section className="relative w-full overflow-hidden rounded-2xl mt-4 sm:mt-6 md:mt-8 mb-8 sm:mb-10 md:mb-12 shadow-xl shadow-black/20">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
        >
          {CAROUSEL_SLIDES.map((slide, i) => (
            <div
              key={i}
              className={`relative flex-shrink-0 w-full min-h-[280px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[480px] xl:min-h-[520px] max-h-[70vh] flex flex-col justify-center overflow-hidden ${slide.className}`}
            >
              {slide.videoUrl && (
                <>
                  <video
                    ref={i === carouselIndex ? videoRef : null}
                    key={i === carouselIndex ? `active-${i}` : `inactive-${i}`}
                    src={slide.videoUrl}
                    autoPlay={i === carouselIndex}
                    muted
                    playsInline
                    crossOrigin="anonymous"
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-hidden
                    onEnded={() => setCarouselIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length)}
                  />
                  {/* โทนเทาเริ่มจาก ~20% ไม่ชิดซ้าย + subtle pulse */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_20%,rgba(0,0,0,0.7)_45%,rgba(0,0,0,0.9)_100%)] animate-gradient-shift aria-hidden" aria-hidden />
                </>
              )}
              <div className="relative z-10 w-full max-w-2xl pl-6 sm:pl-8 md:pl-10 pr-4 py-8">
                {(() => {
                  const isActive = i === carouselIndex
                  const useAuto = isActive && slide.videoUrl
                  const isLight = useAuto ? heroTextDark : (slide.textTheme === 'light')
                  return (
                    <>
                <h2 className={`font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-left drop-shadow-lg transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {slide.title}
                </h2>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    type="button"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${isLight ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-white/90'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    เล่น
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${isLight ? 'bg-gray-900/20 text-gray-900 border border-gray-700 hover:bg-gray-900/30' : 'bg-white/20 text-white border border-white/40 hover:bg-white/30'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                    รายการของฉัน
                  </button>
                </div>
                <p className={`text-sm sm:text-base mt-4 max-w-xl text-left ${isLight ? 'text-gray-700' : 'text-white/90'}`}>
                  {slide.subtitle}
                </p>
                    </>
                  )
                })()}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {CAROUSEL_SLIDES.map((_, i) => {
            const slide = CAROUSEL_SLIDES[i]
            const useAuto = i === carouselIndex && slide?.videoUrl
            const isLight = useAuto ? heroTextDark : (slide?.textTheme === 'light')
            return (
            <button
              key={i}
              type="button"
              onClick={() => setCarouselIndex(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === carouselIndex ? 'w-6' : 'w-2'
              } ${isLight ? (i === carouselIndex ? 'bg-gray-800' : 'bg-gray-500 hover:bg-gray-600') : (i === carouselIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70')} hover:scale-110`}
              aria-label={`Slide ${i + 1}`}
            />
            )
          })}
        </div>
      </section>
      </div>

      {/* ใต้ Hero: สองคอลัมน์ – ความกว้างขยายตามจอใหญ่ */}
      <div className="w-full max-w-7xl xl:max-w-[1500px] 2xl:max-w-[1700px] mx-auto flex flex-1 min-w-0 gap-6 lg:gap-12 xl:gap-16">
        {/* คอลัมน์ซ้าย: Updates, New Manga, ... – ขยายตามจอใหญ่ */}
        <div className="flex-1 min-w-0 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          {/* Updates */}
          <section className="mb-12 sm:mb-14">
            <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Updates</h2>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const el = updatesScrollRef.current
                    if (el) el.scrollBy({ left: -320, behavior: 'smooth' })
                  }}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                  aria-label="เลื่อนซ้าย"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = updatesScrollRef.current
                    if (el) el.scrollBy({ left: 320, behavior: 'smooth' })
                  }}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                  aria-label="เลื่อนขวา"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                </button>
              </div>
            </div>
            <div
              ref={updatesScrollRef}
              className="flex gap-6 sm:gap-7 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
            >
              {updatesList.map((manga) => (
                <CreatorMangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          </section>

          {/* New Manga */}
          <section className="mb-12 sm:mb-14">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">New Manga</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {titles.slice(0, 6).map((manga) => (
                <CreatorMangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          </section>

          <section className="mb-12 sm:mb-14">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">Monthly Awards</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-6">
              {titles.slice(0, 4).map((manga) => (
                <CreatorMangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          </section>

          <section className="mb-10 sm:mb-12">
            <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Recommended for you</h2>
              <Link
                to="/search"
                className="text-sm font-medium text-spotify-lightGray hover:text-white transition flex-shrink-0"
              >
                See more
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6 sm:gap-7">
              {titles.slice(0, 12).map((manga) => (
                <CreatorMangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          </section>
        </div>

        {/* คอลัมน์ขวา: Popular Manga (จอใหญ่เท่านั้น) – ความกว้างขยายบนจอใหญ่มาก */}
        <aside className="hidden lg:flex lg:w-80 xl:w-96 2xl:w-[420px] flex-shrink-0 flex-col rounded-2xl overflow-hidden bg-gradient-to-b from-spotify-gray/50 to-spotify-dark/90 sticky top-6 self-start">
          <div className="p-4 sm:p-5 border-b border-white/10 shrink-0 rounded-t-2xl">
            <h2 className="text-xl font-bold text-white mb-3">Popular Manga</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPopularTab('7days')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  popularTab === '7days' ? 'bg-white text-black' : 'text-spotify-lightGray hover:text-white'
                }`}
              >
                7 days
              </button>
              <button
                type="button"
                onClick={() => setPopularTab('30days')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  popularTab === '30days' ? 'bg-white text-black' : 'text-spotify-lightGray hover:text-white'
                }`}
              >
                30 days
              </button>
            </div>
          </div>
          <div className="p-3 sm:p-4 pb-6 rounded-b-2xl pr-1">
            {popularList.slice(0, 10).map((manga, i) => (
              <CreatorMangaRow key={manga.id} manga={manga} rank={i + 1} />
            ))}
          </div>
        </aside>
      </div>

      {/* Popular Manga บนมือถือ – แสดงใต้เนื้อหาหลัก */}
      <section className="mb-12 sm:mb-14 lg:hidden">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">Popular Manga</h2>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setPopularTab('7days')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              popularTab === '7days' ? 'bg-white text-black' : 'text-spotify-lightGray hover:text-white'
            }`}
          >
            7 days
          </button>
          <button
            type="button"
            onClick={() => setPopularTab('30days')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              popularTab === '30days' ? 'bg-white text-black' : 'text-spotify-lightGray hover:text-white'
            }`}
          >
            30 days
          </button>
        </div>
        <div className="min-h-[280px] overflow-y-auto rounded-xl bg-white/[0.04] p-4 space-y-1 border border-white/5">
          {popularList.slice(0, 10).map((manga, i) => (
            <CreatorMangaRow key={manga.id} manga={manga} rank={i + 1} />
          ))}
        </div>
      </section>
    </div>
  )
}

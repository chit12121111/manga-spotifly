import { Link } from 'react-router-dom'
import { useState } from 'react'

const genres = ['แอคชัน', 'รอมานซ์', 'แฟนตาซี', 'คอมเมดี้', 'สยองขวัญ', 'สไลซ์ออฟไลฟ์', 'ไซไฟ', 'สปอร์ต']

export default function OnboardingPage() {
  const [selected, setSelected] = useState(new Set())

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-spotify-dark flex flex-col items-center justify-center p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">อยากฟังแนวไหนบ้าง?</h1>
      <p className="text-spotify-lightGray mb-8 text-center text-sm">เลือกประเภทที่ชอบ</p>
      <div className="w-full max-w-xl mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => toggle(g)}
              className={`px-4 py-2 rounded-full border transition ${selected.has(g) ? 'bg-spotify-green border-spotify-green text-black' : 'border-white/30 text-white hover:border-white'}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
      <Link to="/">
        <button type="button" className="px-8 py-3 rounded-full bg-spotify-green text-black font-semibold hover:bg-spotify-greenHover transition">
          เสร็จสิ้น
        </button>
      </Link>
    </div>
  )
}

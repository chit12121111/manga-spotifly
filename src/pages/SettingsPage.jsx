import { useState } from 'react'

const sections = [
  { id: 'account', label: 'บัญชี' },
  { id: 'password', label: 'รหัสผ่าน' },
  { id: 'privacy', label: 'ความเป็นส่วนตัว' },
  { id: 'playback', label: 'การเล่น' },
]

export default function SettingsPage() {
  const [active, setActive] = useState('account')
  return (
    <div className="p-4 sm:p-6 pb-24 md:pb-8 flex flex-col md:flex-row gap-6 sm:gap-8 max-w-4xl mx-auto">
      <nav className="flex flex-wrap md:flex-col gap-2 md:w-48 flex-shrink-0">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(s.id)}
            className={`text-left px-4 py-2 rounded-lg transition ${active === s.id ? 'bg-white/10 text-white' : 'text-spotify-lightGray hover:text-white'}`}
          >
            {s.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">การตั้งค่า</h1>
        {active === 'account' && (
          <div className="space-y-4">
            <div>
              <label className="block text-spotify-lightGray text-sm mb-1">อีเมล</label>
              <input type="email" defaultValue="user@example.com" className="w-full py-2 px-4 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:border-spotify-green" />
            </div>
            <div>
              <label className="block text-spotify-lightGray text-sm mb-1">ชื่อที่แสดง</label>
              <input type="text" defaultValue="User" className="w-full py-2 px-4 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:border-spotify-green" />
            </div>
            <button type="button" onClick={() => alert('บันทึกแล้ว (demo)')} className="px-6 py-2 rounded-full bg-spotify-green text-black font-medium hover:bg-spotify-greenHover transition">
              บันทึก
            </button>
          </div>
        )}
        {active === 'password' && (
          <div className="space-y-4">
            <div>
              <label className="block text-spotify-lightGray text-sm mb-1">รหัสผ่านปัจจุบัน</label>
              <input type="password" className="w-full py-2 px-4 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:border-spotify-green" />
            </div>
            <div>
              <label className="block text-spotify-lightGray text-sm mb-1">รหัสผ่านใหม่</label>
              <input type="password" className="w-full py-2 px-4 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:border-spotify-green" />
            </div>
            <button type="button" onClick={() => alert('อัปเดตรหัสผ่านแล้ว (demo)')} className="px-6 py-2 rounded-full bg-spotify-green text-black font-medium hover:bg-spotify-greenHover transition">
              ตั้งรหัสผ่าน
            </button>
          </div>
        )}
        {active === 'privacy' && (
          <div className="space-y-4">
            <label className="flex items-center justify-between py-2">
              <span className="text-white">โหมดส่วนตัว</span>
              <input type="checkbox" className="rounded accent-spotify-green" />
            </label>
            <label className="flex items-center justify-between py-2">
              <span className="text-white">แสดงกิจกรรม</span>
              <input type="checkbox" defaultChecked className="rounded accent-spotify-green" />
            </label>
          </div>
        )}
        {active === 'playback' && (
          <div className="space-y-4">
            <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
              <span className="text-white">ครอสเฟด</span>
              <input type="range" min="0" max="12" className="accent-spotify-green w-32" />
            </label>
            <label className="flex items-center justify-between py-2">
              <span className="text-white">เล่นต่ออัตโนมัติ</span>
              <input type="checkbox" defaultChecked className="rounded accent-spotify-green" />
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

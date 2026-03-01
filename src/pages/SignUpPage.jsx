import { Link } from 'react-router-dom'

export default function SignUpPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-spotify-dark flex flex-col items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-[400px]">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-white mb-10 sm:mb-12 tracking-tight">สมัครสมาชิก Manga Spotifly</h1>
        <div className="space-y-4">
          <input type="email" placeholder="อีเมล" className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-spotify-green" />
          <input type="password" placeholder="รหัสผ่าน" className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-spotify-green" />
          <input type="text" placeholder="ชื่อที่ต้องการใช้แสดง" className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-spotify-green" />
          <label className="flex items-center gap-2 text-spotify-lightGray text-sm">
            <input type="checkbox" className="rounded accent-spotify-green" />
            ฉันยอมรับข้อกำหนดและนโยบายความเป็นส่วนตัว
          </label>
          <Link to="/premium" className="block">
            <button className="w-full py-3 rounded-full bg-spotify-green text-black font-semibold hover:bg-spotify-greenHover transition">
              สมัครสมาชิก
            </button>
          </Link>
        </div>
        <p className="mt-8 text-center text-spotify-lightGray text-sm">
          มีบัญชีอยู่แล้ว? <Link to="/login" className="text-white underline hover:text-spotify-greenHover">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  )
}

import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen min-h-[100dvh] bg-spotify-dark flex flex-col items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-[400px]">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10 sm:mb-12 tracking-tight">Manga Spotifly</h1>
        <div className="space-y-4">
          <button onClick={() => navigate('/')} className="w-full py-3 px-6 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition">
            Log in with Facebook
          </button>
          <button onClick={() => navigate('/')} className="w-full py-3 px-6 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition">
            Log in with Apple
          </button>
          <button onClick={() => navigate('/')} className="w-full py-3 px-6 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition">
            Log in with Google
          </button>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20" /></div>
            <div className="relative flex justify-center"><span className="bg-spotify-dark px-4 text-spotify-lightGray text-sm">หรือ</span></div>
          </div>
          <input type="email" placeholder="อีเมลหรือชื่อผู้ใช้" className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-spotify-green" />
          <input type="password" placeholder="รหัสผ่าน" className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-spotify-green" />
          <Link to="/forgot-password" className="block text-center text-spotify-lightGray hover:text-spotify-greenHover text-sm">ลืมรหัสผ่าน?</Link>
          <button onClick={() => navigate('/')} className="w-full py-3 rounded-full bg-spotify-green text-black font-semibold hover:bg-spotify-greenHover transition">
            เข้าสู่ระบบ
          </button>
        </div>
        <p className="mt-8 text-center text-spotify-lightGray text-sm">
          ยังไม่มีบัญชี? <Link to="/signup" className="text-white underline hover:text-spotify-greenHover">สมัครสมาชิก Manga Spotifly</Link>
        </p>
        <p className="mt-6 text-center text-white/40 text-xs">การเข้าสู่ระบบถือว่าคุณยอมรับข้อกำหนดและนโยบายความเป็นส่วนตัว</p>
      </div>
    </div>
  )
}

import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen min-h-[100dvh] bg-spotify-dark flex flex-col items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-[400px]">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-white mb-4">รีเซ็ตรหัสผ่าน</h1>
        <p className="text-spotify-lightGray text-center mb-8 text-sm">กรอกอีเมล เราจะส่งลิงก์ให้คุณรีเซ็ตรหัสผ่าน</p>
        <input type="email" placeholder="อีเมล" className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-spotify-green mb-4" />
        <button onClick={() => { alert('ตรวจสอบอีเมลของคุณ (demo)'); navigate('/login') }} className="w-full py-3 rounded-full bg-spotify-green text-black font-semibold hover:bg-spotify-greenHover transition mb-6">
          ส่ง
        </button>
        <Link to="/login" className="block text-center text-spotify-lightGray hover:text-spotify-greenHover text-sm">กลับไปหน้าเข้าสู่ระบบ</Link>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'

export default function PickPlanPage() {
  const plans = [
    { name: 'Free', price: '฿0', desc: 'ฟังมังงะได้แบบมีโฆษณา', cta: 'เริ่มใช้', highlight: false },
    { name: 'Premium ส่วนบุคคล', price: '฿129', desc: 'ไม่มีโฆษณา ดาวน์โหลดฟังออฟไลน์ได้', cta: 'เริ่มใช้', highlight: true },
    { name: 'Premium ครอบครัว', price: '฿189', desc: 'สูงสุด 6 บัญชี สำหรับคนในบ้าน', cta: 'เริ่มใช้', highlight: false },
  ]
  return (
    <div className="min-h-screen min-h-[100dvh] bg-spotify-dark flex flex-col items-center justify-center p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">เลือกแผน</h1>
      <p className="text-spotify-lightGray mb-8 sm:mb-12 text-center text-sm">ฟังได้ไม่จำกัด ยกเลิกเมื่อไหร่ก็ได้</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-xl p-5 sm:p-6 border ${p.highlight ? 'border-spotify-green bg-spotify-gray' : 'border-white/20 bg-white/5'}`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">{p.name}</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">{p.price}<span className="text-sm font-normal text-spotify-lightGray">/เดือน</span></p>
            <p className="text-spotify-lightGray text-sm mb-6">{p.desc}</p>
            <Link to="/onboarding">
              <button className={`w-full py-3 rounded-full font-semibold transition ${p.highlight ? 'bg-spotify-green text-black hover:bg-spotify-greenHover' : 'bg-white text-black hover:bg-white/90'}`}>
                {p.cta}
              </button>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/login" className="mt-8 text-spotify-lightGray hover:text-white text-sm">มีบัญชีอยู่แล้ว? เข้าสู่ระบบ</Link>
    </div>
  )
}

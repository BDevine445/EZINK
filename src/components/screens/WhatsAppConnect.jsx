import { DownloadIcon, LinkTapIcon, ChatIcon } from '../icons'

const STEPS = [
  { Icon: DownloadIcon, iconBg: 'bg-blue-100 text-blue-600', text: '1. Download the EZINK App' },
  { Icon: LinkTapIcon, iconBg: 'bg-green-100 text-green-600', text: '2. Tap "Link WhatsApp"' },
  { Icon: ChatIcon, iconBg: 'bg-blue-100 text-blue-600', text: '3. Start Chatting with Our Bot!' },
]

export default function WhatsAppConnect({ onLink }) {
  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-1">Connect to WhatsApp</h1>
      <p className="text-slate-500 mb-6">Get Started with EZINK Bot</p>

      <div className="flex flex-col gap-3 mb-8">
        {STEPS.map(({ Icon, iconBg, text }) => (
          <div key={text} className="flex items-center gap-3 bg-white border border-slate-100 shadow-sm rounded-xl px-4 py-4">
            <span className={`flex items-center justify-center h-9 w-9 rounded-full ${iconBg}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="font-semibold text-slate-800">{text}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onLink}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-xl py-4"
      >
        Link WhatsApp
      </button>
    </div>
  )
}

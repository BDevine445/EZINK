import { StatusBarGlyphs } from './icons'
import BottomNav from './BottomNav'

export default function PhoneShell({ activeTab, onTabChange, children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="w-full max-w-[380px] h-[780px] bg-white rounded-[2.5rem] shadow-xl border border-slate-200 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-4 pb-2 text-slate-800 shrink-0">
          <span className="text-sm font-semibold">9:41</span>
          <StatusBarGlyphs className="h-4 w-14" />
        </div>
        <div className="flex-1 overflow-y-auto px-6 pt-2">{children}</div>
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  )
}

import BottomNav from './BottomNav'

export default function PhoneShell({ activeTab, onTabChange, children }) {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/60 to-cyan-50/50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950 transition-colors duration-300">
      <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-indigo-300/30 dark:bg-indigo-600/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-cyan-300/30 dark:bg-cyan-600/10 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute bottom-16 left-1/4 h-64 w-64 rounded-full bg-fuchsia-200/30 dark:bg-fuchsia-600/10 blur-3xl animate-float" />

      <div className="relative z-10 h-full overflow-y-auto px-6 pt-[calc(env(safe-area-inset-top)+1.25rem)] pb-32">
        {children}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}

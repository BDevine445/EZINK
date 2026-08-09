export default function Settings() {
  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Settings</h1>
      <div className="flex flex-col gap-3">
        {['Profile', 'Notifications', 'Security', 'Help & Support'].map((item) => (
          <div key={item} className="bg-white border border-slate-100 shadow-sm rounded-xl px-4 py-4 font-semibold text-slate-800">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

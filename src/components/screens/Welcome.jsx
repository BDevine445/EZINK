export default function Welcome({ onNavigate }) {
  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Welcome to EZINK</h1>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => onNavigate('cards')}
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-xl py-4 px-5 text-left"
        >
          View Online Purchases Visa
        </button>
        <button
          onClick={() => onNavigate('cards')}
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-xl py-4 px-5 text-left"
        >
          View Send Money Visa
        </button>
        <button
          onClick={() => onNavigate('connect')}
          className="bg-white hover:bg-slate-50 transition-colors text-slate-800 font-semibold rounded-xl py-4 px-5 text-left border border-slate-200 shadow-sm"
        >
          Connect to WhatsApp
        </button>
      </div>
    </div>
  )
}

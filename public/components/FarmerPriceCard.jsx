import PriceCell from './ui/PriceCell'

export default function FarmerPriceCard({ crop }) {
  const { cropName, tamilName, price1, price2, price3, price4 } = crop

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-earth-100 p-5 transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-earth-100">
        <h2 className="text-xl font-bold text-earth-800 leading-tight">{cropName}</h2>
        <p className="font-tamil text-earth-500 text-base mt-0.5">{tamilName}</p>
      </div>

      {/* Price rows */}
      <div className="flex flex-col gap-3">
        <PriceRow label="Day -3" current={price2} previous={price1} />
        <PriceRow label="Day -2" current={price3} previous={price2} />
        <PriceRow label="Today" current={price4} previous={price3} isToday />
      </div>
    </div>
  )
}

function PriceRow({ label, current, previous, isToday }) {
  return (
    <div className={`flex items-center justify-between px-3 py-2 rounded-xl ${isToday ? 'bg-earth-50 border border-earth-200' : ''}`}>
      <span className={`text-sm font-semibold ${isToday ? 'text-earth-700' : 'text-earth-400'}`}>
        {isToday ? '📅 Today' : label}
      </span>
      <PriceCell current={current} previous={previous} />
    </div>
  )
}

import PriceCell from './ui/PriceCell'

export default function FarmerPriceTable({ prices }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-earth-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-earth-700 text-white">
            <th className="text-left px-5 py-4 font-semibold rounded-tl-2xl">Crop</th>
            <th className="text-left px-4 py-4 font-semibold">Tamil Name</th>
            <th className="text-right px-4 py-4 font-semibold">Day -3</th>
            <th className="text-right px-4 py-4 font-semibold">Day -2</th>
            <th className="text-right px-5 py-4 font-semibold rounded-tr-2xl bg-earth-600">Today</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((crop, i) => (
            <tr
              key={crop.cropName}
              className={`border-t border-earth-100 transition-colors hover:bg-earth-50 ${
                i % 2 === 0 ? '' : 'bg-earth-50/40'
              }`}
            >
              <td className="px-5 py-4 font-bold text-earth-800 text-base">{crop.cropName}</td>
              <td className="px-4 py-4 font-tamil text-earth-500 text-base">{crop.tamilName}</td>
              <td className="px-4 py-4 text-right">
                <PriceCell current={crop.price2} previous={crop.price1} />
              </td>
              <td className="px-4 py-4 text-right">
                <PriceCell current={crop.price3} previous={crop.price2} />
              </td>
              <td className="px-5 py-4 text-right bg-amber-50/60">
                <PriceCell current={crop.price4} previous={crop.price3} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

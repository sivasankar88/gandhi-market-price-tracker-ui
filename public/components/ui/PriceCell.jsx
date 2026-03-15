import { getTrend, trendStyle, formatPrice } from '../../utils/priceHelpers'

export default function PriceCell({ current, previous }) {
  const trend = getTrend(current, previous)
  const { className, arrow } = trendStyle(trend)

  return (
    <span className={`inline-flex items-center gap-1 font-bold text-lg ${className}`}>
      <span className="text-sm">{arrow}</span>
      {formatPrice(current)}
    </span>
  )
}

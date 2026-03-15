import { getTrend, trendStyle, formatPrice } from "../../utils/priceHelpers";

interface PriceCellProps {
  currentMin: number;
  currentMax: number;
  previousMin: number;
  previousMax: number;
}

export default function PriceCell({
  currentMin,
  currentMax,
  previousMin,
  previousMax,
}: PriceCellProps) {
  const trend = getTrend(currentMin + currentMax, previousMin + previousMax);
  const { className, arrow } = trendStyle(trend);

  return (
    <span
      className={`inline-flex items-center gap-1 font-bold text-lg ${className}`}>
      <span
        className={`text-sm ${trend === "up" ? "text-green-900" : "text-red-900"}`}>
        {arrow}
      </span>
      {formatPrice(currentMin, currentMax)}
    </span>
  );
}

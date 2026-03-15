import type { Trend } from "../types";

export function getTrend(current: number, previous: number): Trend {
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "same";
}

export function trendStyle(trend: Trend): { className: string; arrow: string } {
  switch (trend) {
    case "up":
      return { className: "price-up", arrow: "▲" };
    case "down":
      return { className: "price-down", arrow: "▼" };
    default:
      return { className: "price-same", arrow: "" };
  }
}

export function formatPrice(curretnMin: number, curretnMax: number): string {
  if (curretnMin === null) return "-";
  return curretnMax === curretnMin
    ? `₹${curretnMin}`
    : `₹${curretnMin} - ₹${curretnMax}`;
}

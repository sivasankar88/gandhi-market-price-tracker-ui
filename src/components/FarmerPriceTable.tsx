import { useNavigate } from "react-router-dom";
import type { CropPrice } from "../types";
import PriceCell from "./ui/PriceCell";

interface FarmerPriceTableProps {
  prices: CropPrice[];
}

export default function FarmerPriceTable({ prices }: FarmerPriceTableProps) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto rounded-2xl border border-earth-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-earth-700 text-white">
            <th className="text-left px-5 py-4 font-semibold rounded-tl-2xl">
              Crop
            </th>
            <th className="text-left px-4 py-4 font-semibold">Tamil Name</th>
            <th className="text-right px-4 py-4 font-semibold">Day -3</th>
            <th className="text-right px-4 py-4 font-semibold">Day -2</th>
            <th className="text-right px-5 py-4 font-semibold bg-earth-600">
              Today
            </th>
            <th className="text-center px-4 py-4 font-semibold rounded-tr-2xl">
              Trend
            </th>
          </tr>
        </thead>
        <tbody>
          {prices.map((crop, i) => (
            <tr
              key={crop.cropName}
              onClick={() =>
                navigate(`/trend/${crop.id}`, {
                  state: { cropName: crop.cropName, tamilName: crop.tamilName },
                })
              }
              className={`border-t border-earth-100 transition-colors hover:bg-earth-50 ${i % 2 !== 0 ? "bg-earth-50/40" : ""}`}>
              <td className="px-5 py-4 font-bold text-earth-800 text-base">
                {crop.cropName}
              </td>
              <td className="px-4 py-4 font-tamil text-earth-500 text-base">
                {crop.tamilName}
              </td>
              <td className="px-4 py-4 text-right">
                <PriceCell
                  currentMin={crop.minPrice3}
                  previousMin={crop.minPrice4}
                  currentMax={crop.maxPrice3}
                  previousMax={crop.maxPrice4}
                />
              </td>
              <td className="px-4 py-4 text-right">
                <PriceCell
                  currentMin={crop.minPrice2}
                  previousMin={crop.minPrice3}
                  currentMax={crop.maxPrice2}
                  previousMax={crop.minPrice3}
                />
              </td>
              <td className="px-5 py-4 text-right bg-amber-50/60">
                <PriceCell
                  currentMin={crop.minPrice2}
                  previousMin={crop.minPrice3}
                  currentMax={crop.maxPrice2}
                  previousMax={crop.minPrice3}
                />
              </td>
              <td className="px-4 py-4 text-center">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-earth-500 bg-earth-50 border border-earth-200 px-2.5 py-1 rounded-lg hover:bg-earth-100 transition-colors">
                  📊 View
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

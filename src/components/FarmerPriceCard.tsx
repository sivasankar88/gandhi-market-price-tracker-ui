import { useNavigate } from "react-router-dom";
import type { CropPrice } from "../types";
import { dateSubraction } from "../utils/dateHelpers";
import PriceCell from "./ui/PriceCell";
interface FarmerPriceCardProps {
  crop: CropPrice;
}

interface PriceRowProps {
  label: string;
  currentMin: number;
  currentMax: number;
  previousMin: number;
  previousMax: number;
  isToday?: boolean;
}

function PriceRow({
  label,
  currentMin,
  currentMax,
  previousMin,
  previousMax,
  isToday = false,
}: PriceRowProps) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-xl ${isToday ? "bg-earth-50 border border-earth-200" : ""}`}>
      <span
        className={`text-sm font-semibold ${isToday ? "text-earth-700" : "text-earth-400"}`}>
        {isToday ? "📅 Today (இன்று)" : label}
      </span>
      <PriceCell
        currentMin={currentMin}
        currentMax={currentMax}
        previousMin={previousMin}
        previousMax={previousMax}
      />
    </div>
  );
}

export default function FarmerPriceCard({ crop }: FarmerPriceCardProps) {
  const navigate = useNavigate();
  const {
    id,
    cropName,
    tamilName,
    minPrice1,
    minPrice2,
    minPrice3,
    minPrice4,
    maxPrice1,
    maxPrice2,
    maxPrice3,
    maxPrice4,
  } = crop;
  const handleClick = (id: number) => {
    navigate(`/trend/${id}`, { state: { cropName, tamilName } });
  };
  return (
    <div
      onClick={() => handleClick(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick(id)}
      className="bg-white rounded-2xl shadow-sm border border-earth-100 p-5 transition-shadow hover:shadow-md">
      <div className="mb-4 pb-3 border-b border-earth-100">
        <h2 className="text-xl font-bold text-earth-800 leading-tight">
          {cropName}
        </h2>
        <p className="font-tamil text-earth-500 text-base mt-0.5">
          {tamilName}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <PriceRow
          label={dateSubraction(2)}
          currentMin={minPrice3}
          previousMin={minPrice4}
          currentMax={maxPrice3}
          previousMax={maxPrice4}
        />
        <PriceRow
          label={dateSubraction(1)}
          currentMin={minPrice2}
          previousMin={minPrice3}
          currentMax={maxPrice2}
          previousMax={minPrice3}
        />
        <PriceRow
          label="Today"
          currentMin={minPrice1}
          previousMin={minPrice2}
          currentMax={maxPrice1}
          previousMax={minPrice2}
          isToday
        />
      </div>
      <p className="text-xs text-earth-400 text-center mt-3 font-tamil">
        தொடவும் • Tap to see trend
      </p>
    </div>
  );
}

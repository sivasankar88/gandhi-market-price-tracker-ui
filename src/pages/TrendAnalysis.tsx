import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useTrend from "../hooks/useTrend";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import Spinner from "../components/ui/Spinner";
import ErrorBanner from "../components/ui/ErrorBanner";
import type { TrendType, TrendOption } from "../types";

const TREND_OPTIONS: TrendOption[] = [
  {
    type: "LAST30",
    label: "Last 30 Days",
    tamilLabel: "கடந்த 30 நாள்",
    description: "Daily prices",
  },
  {
    type: "MONTHLY",
    label: "Monthly",
    tamilLabel: "மாதாந்திரம்",
    description: "Monthly average",
  },
  {
    type: "YEARLY",
    label: "Yearly",
    tamilLabel: "வருடாந்திரம்",
    description: "5-year trend",
  },
];

export default function TrendAnalysis() {
  const { cropId } = useParams<{ cropId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    cropName?: string;
    tamilName?: string;
  } | null;

  const cropName = state?.cropName ?? "Crop";
  const tamilName = state?.tamilName ?? "";
  const parsedCropId = parseInt(cropId ?? "0", 10);

  const [selectedType, setSelectedType] = useState<TrendType>("LAST30");
  const { data, loading, error, refetch } = useTrend(
    parsedCropId,
    selectedType,
  );

  const selectedOption = TREND_OPTIONS.find((o) => o.type === selectedType)!;

  // Stats computed from data
  const values = data.map((d) => d.value);
  const maxPrice = values.length ? Math.max(...values) : null;
  const minPrice = values.length ? Math.min(...values) : null;
  const avgPrice = values.length
    ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
    : null;
  const latestPrice = values.length ? values[values.length - 1] : null;
  const prevPrice = values.length > 1 ? values[values.length - 2] : null;
  const priceChange =
    latestPrice !== null && prevPrice !== null ? latestPrice - prevPrice : null;

  return (
    <div className="max-w-3xl mx-auto px-4 pt-5 pb-10">
      {/* Back button + header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-earth-100 text-earth-700 hover:bg-earth-200 active:scale-95 transition-all text-lg">
          ←
        </button>
        <div>
          <h1 className="text-xl font-bold text-earth-800 leading-tight">
            {cropName} — Price Trend
          </h1>
          {tamilName && (
            <p className="font-tamil text-earth-500 text-sm">
              {tamilName} — விலை போக்கு
            </p>
          )}
        </div>
      </div>

      {/* Trend type selector */}
      <div className="bg-white rounded-2xl border border-earth-100 shadow-sm p-1 flex gap-1 mb-5">
        {TREND_OPTIONS.map((opt) => (
          <button
            key={opt.type}
            onClick={() => setSelectedType(opt.type)}
            className={`flex-1 py-3 px-2 rounded-xl transition-all text-center ${
              selectedType === opt.type
                ? "bg-earth-700 text-white shadow-sm"
                : "text-earth-500 hover:bg-earth-50 active:bg-earth-100"
            }`}>
            <div
              className={`text-sm font-bold ${selectedType === opt.type ? "text-white" : "text-earth-700"}`}>
              {opt.label}
            </div>
            <div
              className={`font-tamil text-xs mt-0.5 ${selectedType === opt.type ? "text-earth-200" : "text-earth-400"}`}>
              {opt.tamilLabel}
            </div>
          </button>
        ))}
      </div>

      {/* Stats row */}
      {!loading && !error && data.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <StatCard
            icon="📈"
            label="Highest"
            tamilLabel="அதிகபட்சம்"
            value={maxPrice !== null ? `₹${maxPrice}` : "—"}
            valueClass="text-chili-600"
          />
          <StatCard
            icon="📉"
            label="Lowest"
            tamilLabel="குறைந்தபட்சம்"
            value={minPrice !== null ? `₹${minPrice}` : "—"}
            valueClass="text-leaf-600"
          />
          <StatCard
            icon="⚖️"
            label="Average"
            tamilLabel="சராசரி"
            value={avgPrice !== null ? `₹${avgPrice}` : "—"}
            valueClass="text-earth-700"
          />
          <StatCard
            icon={priceChange !== null && priceChange >= 0 ? "🟢" : "🔴"}
            label="Change"
            tamilLabel="மாற்றம்"
            value={
              priceChange !== null
                ? `${priceChange >= 0 ? "+" : ""}₹${priceChange}`
                : "—"
            }
            valueClass={
              priceChange !== null && priceChange >= 0
                ? "text-leaf-600"
                : "text-chili-600"
            }
          />
        </div>
      )}

      {/* Chart card */}
      <div className="bg-white rounded-2xl border border-earth-100 shadow-sm p-4 mb-4">
        {/* Chart header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-earth-700">
              {selectedOption.description}
            </p>
            <p className="font-tamil text-xs text-earth-400 mt-0.5">
              {selectedOption.tamilLabel}
            </p>
          </div>
          <button
            onClick={refetch}
            disabled={loading}
            className="p-2 rounded-xl bg-earth-50 text-earth-600 hover:bg-earth-100 active:scale-95 transition-all text-base disabled:opacity-50"
            title="Refresh">
            🔄
          </button>
        </div>

        {loading && <Spinner size="md" />}
        {error && <ErrorBanner message={error} onRetry={refetch} />}

        {!loading && !error && data.length === 0 && (
          <div className="text-center py-12 text-earth-400">
            <div className="text-4xl mb-2">📊</div>
            <p className="font-semibold text-sm">
              No data available for this period.
            </p>
            <p className="font-tamil text-xs mt-1">
              இந்த காலகட்டத்திற்கு தரவு இல்லை
            </p>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <>
            {selectedType === "YEARLY" ? (
              <BarChart data={data} cropName={cropName} />
            ) : (
              <LineChart data={data} cropName={cropName} type={selectedType} />
            )}
          </>
        )}
      </div>

      {/* Legend */}
      {!loading && !error && data.length > 0 && (
        <div className="bg-earth-50 rounded-xl px-4 py-3 flex flex-wrap gap-4 text-xs text-earth-500">
          {selectedType === "YEARLY" ? (
            <>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-leaf-500 inline-block" />{" "}
                Highest year
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-earth-400 inline-block" />{" "}
                Other years
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-chili-500 inline-block" />{" "}
                Peak price
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-leaf-600 inline-block" />{" "}
                Lowest price
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-earth-500 inline-block" />{" "}
                Regular
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  icon: string;
  label: string;
  tamilLabel: string;
  value: string;
  valueClass: string;
}

function StatCard({
  icon,
  label,
  tamilLabel,
  value,
  valueClass,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-earth-100 shadow-sm px-4 py-3">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-base">{icon}</span>
        <span className="text-xs font-semibold text-earth-500">{label}</span>
      </div>
      <p className={`text-xl font-bold ${valueClass}`}>{value}</p>
      <p className="font-tamil text-xs text-earth-400 mt-0.5">{tamilLabel}</p>
    </div>
  );
}

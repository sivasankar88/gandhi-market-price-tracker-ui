import useFarmerPrices from '../hooks/useFarmerPrices'
import FarmerPriceCard from '../components/FarmerPriceCard'
import FarmerPriceTable from '../components/FarmerPriceTable'
import Spinner from '../components/ui/Spinner'
import ErrorBanner from '../components/ui/ErrorBanner'

export default function FarmerDashboard() {
  const { prices, loading, error, refetch, lastUpdated } = useFarmerPrices()

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-earth-800">Today's Crop Prices</h1>
        <p className="font-tamil text-earth-500 text-base mt-1">இன்றைய பயிர் விலைகள்</p>
        {lastUpdated && (
          <p className="text-xs text-earth-400 mt-1">
            Updated: {lastUpdated.toLocaleTimeString('en-IN')}
          </p>
        )}
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => void refetch()}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-earth-600 text-white rounded-xl text-sm font-semibold active:scale-95 transition-transform disabled:opacity-50"
        >
          🔄 Refresh
        </button>
      </div>

      {loading && <Spinner />}
      {error && <ErrorBanner message={error} onRetry={() => void refetch()} />}

      {!loading && !error && prices.length === 0 && (
        <div className="text-center py-16 text-earth-400">
          <div className="text-5xl mb-3">🌾</div>
          <p className="font-semibold">No prices available today.</p>
        </div>
      )}

      {!loading && !error && prices.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
            {prices.map((crop) => (
              <FarmerPriceCard key={crop.cropName} crop={crop} />
            ))}
          </div>
          <div className="hidden md:block">
            <FarmerPriceTable prices={prices} />
          </div>
        </>
      )}
    </div>
  )
}

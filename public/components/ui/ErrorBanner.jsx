export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="mx-4 mt-6 bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
      <div className="text-3xl mb-2">⚠️</div>
      <p className="text-red-700 font-semibold text-base">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-6 py-2.5 bg-earth-600 text-white rounded-xl font-semibold text-sm active:scale-95 transition-transform"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

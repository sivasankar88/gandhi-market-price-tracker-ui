import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-earth-50 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background texture pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #854516 0px, #854516 1px,
            transparent 1px, transparent 24px
          )`,
        }}
      />

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-earth-300 via-earth-500 to-earth-300" />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-earth-100 border-2 border-earth-200 flex items-center justify-center text-4xl shadow-inner">
            🌾
          </div>
        </div>

        {/* 404 number */}
        <h1
          className="font-display text-earth-800 leading-none mb-2"
          style={{
            fontSize: "clamp(80px, 18vw, 120px)",
            letterSpacing: "-4px",
          }}>
          4<span className="text-earth-500">0</span>4
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="h-px w-16 bg-earth-300" />
          <div className="w-2 h-2 rounded-full bg-earth-400" />
          <div className="h-px w-16 bg-earth-300" />
        </div>

        {/* Title */}
        <h2 className="font-display text-earth-800 text-2xl font-semibold mb-3">
          பக்கம் கிடைக்கவில்லை
        </h2>
        <p className="font-body text-earth-600 text-base leading-relaxed mb-8">
          This page has left the market. The route you're looking for no longer
          exists or may have moved to a different location.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="font-body font-medium px-6 py-3 rounded-lg bg-earth-600 text-earth-50 hover:bg-earth-700 active:scale-95 transition-all duration-150 text-sm">
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="font-body font-medium px-6 py-3 rounded-lg border border-earth-300 text-earth-700 hover:bg-earth-100 active:scale-95 transition-all duration-150 text-sm bg-white">
            Go Back
          </button>
        </div>

        {/* Footer note */}
        <p className="font-body text-earth-400 text-xs mt-8">
          Gandhi Market Price Tracker
        </p>
      </div>

      {/* Decorative bottom-left leaf */}
      <div className="absolute bottom-8 left-8 text-5xl opacity-10 rotate-12 select-none pointer-events-none">
        🌿
      </div>
      {/* Decorative top-right leaf */}
      <div className="absolute top-8 right-8 text-5xl opacity-10 -rotate-12 select-none pointer-events-none">
        🌱
      </div>
    </div>
  );
}

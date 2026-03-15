import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="bg-earth-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-wide">Gandhi Market</span>
          <span className="font-tamil text-earth-200 text-sm">
            காந்தி சந்தை
          </span>
        </div>
        <nav className="flex gap-2">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              pathname === "/"
                ? "bg-earth-500 text-white"
                : "text-earth-200 hover:bg-earth-600 hover:text-white"
            }`}>
            🌾 Prices
          </Link>
          <Link
            to="/admin"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              pathname === "/admin"
                ? "bg-earth-500 text-white"
                : "text-earth-200 hover:bg-earth-600 hover:text-white"
            }`}>
            ⚙️ Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

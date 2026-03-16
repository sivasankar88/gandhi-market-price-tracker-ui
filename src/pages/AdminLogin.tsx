import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/api";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await auth.login(form);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #854516 0px, #854516 1px,
            transparent 1px, transparent 28px
          )`,
        }}
      />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-earth-300 via-earth-500 to-earth-300" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-earth-100 border-2 border-earth-200 text-2xl mb-4 shadow-inner">
            🌿
          </div>
          <h1 className="font-display text-earth-800 text-2xl font-semibold leading-tight">
            காந்தி மார்க்கெட்
          </h1>
          <p className="font-body text-earth-500 text-sm mt-1 tracking-wide uppercase">
            Price Tracker · Admin Portal
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-earth-200 shadow-sm px-8 py-8">
          {/* Admin badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px flex-1 bg-earth-100" />
            <span className="font-body text-xs font-medium text-earth-500 uppercase tracking-widest px-2">
              Admin Sign In
            </span>
            <div className="h-px flex-1 bg-earth-100" />
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-chili-400 text-chili-600 font-body text-sm flex items-start gap-2">
              <span className="mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block font-body text-xs font-medium text-earth-600 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Enter your username"
                required
                className="w-full font-body text-sm text-earth-800 placeholder-earth-300 bg-earth-50 border border-earth-200 rounded-lg px-4 py-3 outline-none focus:border-earth-500 focus:ring-2 focus:ring-earth-200 transition-all duration-150"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-body text-xs font-medium text-earth-600 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                required
                className="w-full font-body text-sm text-earth-800 placeholder-earth-300 bg-earth-50 border border-earth-200 rounded-lg px-4 py-3 outline-none focus:border-earth-500 focus:ring-2 focus:ring-earth-200 transition-all duration-150"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-body font-medium text-sm text-earth-50 bg-earth-600 hover:bg-earth-700 disabled:bg-earth-300 active:scale-[0.99] rounded-lg py-3 transition-all duration-150 mt-2">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer note */}
          <p className="font-body text-earth-400 text-xs text-center mt-6">
            Farmer view doesn't require login.{" "}
            <a href="/" className="text-earth-600 hover:underline">
              Visit market prices →
            </a>
          </p>
        </div>

        {/* Bottom caption */}
        <p className="font-body text-earth-400 text-xs text-center mt-5">
          Secured with JWT · Session expires in 15 minutes
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 right-8 text-5xl opacity-10 rotate-12 select-none pointer-events-none">
        🌾
      </div>
      <div className="absolute top-12 left-8 text-4xl opacity-10 -rotate-6 select-none pointer-events-none">
        🌱
      </div>
    </div>
  );
}

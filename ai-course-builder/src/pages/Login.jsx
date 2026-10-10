import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Check your details.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center
      bg-slate-50 px-4 py-10"
    >
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-slate-200
          bg-white p-8 shadow-sm"
      >
        <p className="font-semibold text-indigo-600">AI COURSE BUILDER</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-2 mb-6 text-sm text-slate-500">
          Log in to continue learning.
        </p>

        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          className="mb-4 w-full rounded-lg border p-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="you@example.com"
        />

        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          className="mb-5 w-full rounded-lg border p-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="Your password"
        />

        {error && (
          <p role="alert" className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 p-3
            font-semibold text-white hover:bg-indigo-700
            disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-indigo-600">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
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
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-2xl border border-slate-200
          bg-white p-8 shadow-sm"
      >
        <p className="font-semibold text-indigo-600">AI COURSE BUILDER</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Create your account
        </h1>
        <p className="mt-2 mb-6 text-sm text-slate-500">
          Start building your personalized learning journey.
        </p>

        <label className="mb-1 block text-sm font-medium">Full name</label>
        <input
          className="mb-4 w-full rounded-lg border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          autoComplete="name"
          placeholder="Your name"
        />

        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          className="mb-4 w-full rounded-lg border p-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={255}
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
          minLength={8}
          autoComplete="new-password"
          placeholder="At least 8 characters"
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
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}

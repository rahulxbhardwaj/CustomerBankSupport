"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();
  const [formdata, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log("Backend Error:", data.message);
        setMessage(data.message);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Error occurred while logging in");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow-sm bg-white/70 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-blue-800">
          Bhardwaj<span className="text-blue-500">Bank</span>
        </h1>
        <div className="space-x-6 text-gray-600 font-medium flex items-center">
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>
          <Link href="/#features" className="hover:text-blue-700">
            Features
          </Link>
          <Link href="/#rates" className="hover:text-blue-700">
            Rates
          </Link>
          <Link href="/#about" className="hover:text-blue-700">
            About
          </Link>
        </div>
      </nav>

      {/* Form */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl w-[100%] max-w-md p-10 border border-blue-100"
        >
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">
            Bhardwaj<span className="text-blue-500">Bank</span>
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Welcome back! Please login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formdata.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                required
              />
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm bg-red-500 text-white py-2 px-3 rounded-md text-center"
              >
                {message}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition text-lg"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link
              href="/components/registerform"
              className="text-blue-600 hover:underline font-medium"
            >
              Register here
            </Link>
          </div>

          <div className="text-center text-xs text-gray-400 mt-8">
            © {new Date().getFullYear()} BhardwajBank • Secure AI Banking
          </div>
        </motion.div>
      </div>
    </>
  );
}

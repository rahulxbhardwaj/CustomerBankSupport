"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step === 1 && !name) return setError("Please enter your full name.");
    if (step === 2 && !username) return setError("Please enter a username.");
    setError("");
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !username || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/register/regUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setName("");
        setUsername("");
        setPassword("");
        setStep(1);
        window.location.href = "/"; // Redirect to login page
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for slide/fade
  const variants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-[90%] max-w-md p-10 border border-blue-100">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">
          Bhardwaj<span className="text-blue-500">Bank</span>
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Create your secure account in a few easy steps
        </p>

        <form onSubmit={handleSubmit} className="relative h-36">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="name"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="username"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <label className="block text-gray-700 font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="password"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {error && (
          <div className="mt-4 text-sm bg-red-500 text-white py-2 px-3 rounded-md text-center">
            {error}
          </div>
        )}

        <div className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/components/loginform" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </div>

        <div className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} BhardwajBank • Secure AI Banking
        </div>
      </div>
    </div>
  );
}

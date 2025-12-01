import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Offer() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      {/* Main Card */}
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">No Offers Available</h1>
        <p className="text-gray-600 mb-6 text-lg">
          It&apos;s not you, it&apos;s us! Currently, there are no personalized offers available for your account.
        </p>
        <p className="text-gray-500 mb-6">
          Keep checking back — we might have something exciting for you soon!
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Explore Banking Services
        </Link>
      </div>

      {/* Optional Illustration */}
      <div className="w-40 mt-10 opacity-80 relative h-40">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="No Offers"
          fill
          style={{ objectFit: 'contain' }}
          unoptimized
        />
      </div>
    </div>
  );
}

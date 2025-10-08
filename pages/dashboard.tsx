"use client"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Dashboard(){
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please login first");
      router.push("/");
    }
  }, [router]);

  return(
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard!</p>
      </div>
    </div>
  )
}
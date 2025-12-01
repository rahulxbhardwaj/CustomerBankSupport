"use client"
import { useState } from "react";
import { useRouter } from "next/router";

export default function DashboardNavBar({ setActiveTab }) {

  const [logoutLoading, setLogoutLoading] = useState(false);

  const router = useRouter();




  const handleLogout = async () => {
    setLogoutLoading(true); // start animation
    try {
      const res = await fetch("/api/logout/logoutUser", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        window.location.href = "/"; // redirect to login
      }
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLogoutLoading(false); // stop animation
    }
  };


  
  // const handleLogout = async () => {
  //   try{
  //     const res = await fetch("/api/logout/logoutUser" , {
  //       method: "POST" ,
  //       credentials: "include",
  //     });

  //     if(res.ok){
  //       router.push("/");
  //     }else{
  //       console.error("Logout failed")
  //     }
    
  //   }catch(error){
  //     console.error("Logout error:", error);
  //   }
  // };
  

  
  return (
    <nav className="flex justify-between items-center bg-white shadow-md px-8 py-4">
      {/* Left Section */}
      <div className="flex space-x-8">
        <h1 className="text-2xl font-bold text-indigo-600">BhardwajBank</h1>
        <button 
           onClick={() => setActiveTab("accounts")}
          className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
          Accounts
        </button>
        
        <button 
          onClick={() => setActiveTab("fundTransfer")}
          className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
          Fund Transfer
        </button>

        <button 
          onClick={() => setActiveTab("services")}
          className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
          Banking Services
        </button>

        <button
            onClick={() => setActiveTab("aicopilot")}
            className="text-rainbow font-2xl transition-colors">
            AI Copilot
        </button>
        
      </div>

      {/* Right Section */}
      <div>



        
        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
        >
          {logoutLoading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          )}
          {logoutLoading ? "Logging out..." : "Logout"}
        </button>




        
      </div>
    </nav>
  );
}

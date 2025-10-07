"use client"; 
import { useState } from "react"
import Link from "next/link"

export  default function RegisterForm(){

  const [name , setName] = useState("");
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const [error , setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const res = await fetch("/api/register/regUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Response Received:", data.message);
        setError(""); // clear previous errors
        alert(data.message); // success popup
        setName("");
        setUsername("");
        setPassword("");
        const form = e.target;
        form.reset();
      } else {
        console.log("Backend Error:", data.message);
        setError(data.message); // show backend error in UI
        alert(data.message); // optional popup for error
      }
    } catch (error) {
      console.log("Network/Error Occurred:", error);
      setError("Something went wrong. Please try again.");
      alert("Something went wrong. Please try again.");
    }
  };

  
  return(
    <form onSubmit={handleSubmit}>
     

      <input type="text" placeholder="Enter Full Name" className="!ml-[40px]" onChange={e=> setName(e.target.value)}/><br></br><br></br>
      
      <input type="text" placeholder="Enter Username" className="!ml-[40px]" onChange={e=> setUsername(e.target.value)}/><br></br><br></br>

        <input type="password" placeholder="Enter Password" className="!ml-[40px]" onChange={e=> setPassword(e.target.value)}/><br></br><br></br>

        <button className="bg-green-600 text-white ml-35 font-bold cursor-pointer px-6 py-2">Register</button>

    { error && (
<div className="text-sm bg-red-500 text-white w-fit py-1 px-3 rounded-md mt-2">
  {error}
        </div>
      )}
       
<br></br>
  <div className="mt-5">

      <Link href={"/"} >Already have a Account <span className="underline">Login</span></Link>
  </div>  

      </form>
  )
}
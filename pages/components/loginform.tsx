"use client"
import Link from "next/link"
import {use, useState} from "react"
import { useRouter } from "next/router"

export default function LoginForm(){
  const router = useRouter();
  const [formdata , setFormData] = useState({username: "" , password: ""});
  const [message , setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({...formdata , [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch("/api/login/loginUser" , {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formdata),
      });

      const data = await res.json()

      if(!res.ok){
        console.log("Backend Error:", data.message);
        setMessage(data.message);
      }else{
        // Store token in localStorage as fallback for Replit iframe environment
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          console.log("Token stored in localStorage");
        }
        alert("Login Successful");
        setMessage(data.message);
        router.push("/dashboard");
      }
     
    }catch(error){
      console.error("Login error:", error);
      setMessage("Error Occurred while Logging In");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      
      <input type="text" placeholder="Username" name="username" value={formdata.username} className="!ml-[40px]" onChange={handleChange}/><br></br><br></br>
       
        <input type="password" placeholder="Password" name="password" value={formdata.password} className="!ml-[40px]" onChange={handleChange}/><br></br><br></br>

        <button className="bg-green-600 text-white ml-40 font-bold cursor-pointer px-6 py-2" type="submit">Login</button>
        <div className="text-sm bg-red-500 text-white w-fit py-1 px-3 rounded-md mt-2">
          {message}
        </div>
        
      <Link href={"/register"}>Dont have an Account? <span className="underline">Register</span></Link>
      
      </form>
      
    </div>
  )
}
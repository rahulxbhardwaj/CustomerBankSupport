"use client";
import { useState } from "react";

export default function QueryForm() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  // Function to call our API
  async function queryRequest() {
    try {
      const res = await fetch("/api/chat/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery: input }), // 👈 sending input text
      });

      const data = await res.json();
     console.log(res.json);
     
      setResponse(data.data);
      
      if(data.data.toLowerCase().includes("positive")){
          try {
            console.log("Postiive feedback Detected !!!!!!")
            const feedback = await fetch("/api/feedback/saveFeedback", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ "message" : input}),
            });
            console.log(feedback);// ← THIS PARENTHESIS WAS MISSING
          } catch(error) {
            console.log("Error in saving feedback", error);
          }


       }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Query Form</h1>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter your query"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={queryRequest}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>

      {response && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-700"><strong>API Response:</strong> {response}</p>
        </div>
      )}
    </div>
  );
}

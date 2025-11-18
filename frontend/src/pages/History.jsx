import {useState,useEffect} from "react";
import NavBar from "../components/NavBar";

// 1. Define the base URL using the environment variable
const BASE_URL = import.meta.env.VITE_BACKEND_URL; 
// 2. Define the full API endpoint for this request
const HISTORY_API_URL = `${BASE_URL}/summeries/history`;

const History=()=>{
    const[summaries,setSummaries]=useState([]);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState("");

    useEffect(()=>{
        const fetchSummaries=async()=>{
        try{
            const token=localStorage.getItem("token");
            setLoading(true);
            const res=await fetch(HISTORY_API_URL,{
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
        });
        const data=await res.json();
        if(!res.ok){
            throw new Error(data.message||"Failed to fetch summaries");
        }
        setSummaries(data.summaries);
    }catch(err){
        setError(err.message);
    }finally{
        setLoading(false);
    }
};
        fetchSummaries();
    },[]);

    if (loading) return <p className="text-center text-gray-600 mt-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
  <div className="w-full min-h-screen bg-gray-100">
    <NavBar />

    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Summary History</h1>

      {summaries.length === 0 ? (
        <p className="text-center text-gray-500">No summaries found.</p>
      ) : (
        <div className="w-full space-y-6">
          {summaries.map((s) => (
            <div
              key={s._id}
              className="w-full bg-white shadow-md rounded-xl p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {s.title}
              </h2>
              <p className="text-gray-600 mb-3">
                <strong>Original:</strong> {s.originalText}
              </p>
              <p className="text-gray-800 bg-gray-50 p-3 rounded-md">
                <strong>Summary:</strong> {s.summarizedText}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Created on: {new Date(s.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default History;

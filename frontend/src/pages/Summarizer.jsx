import { useState } from "react";
import NavBar from "../components/NavBar";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Summarizer = () => {
  const [articleId, setArticleId] = useState("");
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const[summary,setSummary]=useState("");
const[summarizing,setSummarizing]=useState(false);

  const handleSearch = async () => {
    setError("");
    setArticle(null);
    setSummary("");

    if (!articleId.trim()) {
      setError("Please enter an Article ID");
      return;
    }

    try {
      setLoading(true);
          const token = localStorage.getItem("token"); 

          // 1. UPDATE: Use BASE_URL and template literal to construct the search URL
      const SEARCH_URL = `${BASE_URL}/articles/${articleId}`;

      const response = await fetch(SEARCH_URL,{headers: {
        "Authorization": `Bearer ${token}`,  
        "Content-Type": "application/json"
    }});

      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch article");
      }

      setArticle(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize=async()=>{
    if (!article){
      setError("Please search for the aricle first");
      return;
    }

    try{
      setSummarizing(true);
      setError("");
      const token = localStorage.getItem("token");


      // 2. UPDATE: Define the summarize URL using BASE_URL
      const SUMMARIZE_URL = `${BASE_URL}/summeries`;

      const res=await fetch(SUMMARIZE_URL,{
        method:"POST",
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          title:article.title,
          originalText:article.content
        })
      });
      const data=await res.json();
      if(!res.ok){
        throw new Error(data.message || "Failed to summarize article");
      }

      setSummary(data.summary.summarizedText);
    }catch(err){
      setError(err.message);
    }finally{
      setSummarizing(false);
    }
  };

return (
  <div className="w-screen min-h-screen bg-gray-100">
    
    <NavBar />

    
    <div className="w-full min-h-screen bg-white p-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Article Summarizer
      </h1>

    
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Enter Article ID"
          value={articleId}
          onChange={(e) => setArticleId(e.target.value)}
          className="border border-gray-400 px-4 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

     
      {loading && (
        <p className="text-center text-gray-600 font-medium mb-6">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold mb-6">{error}</p>
      )}

   
      {article && (
        <div className="max-w-3xl w-full mx-auto bg-gray-50 shadow-md rounded-lg p-8 border">
          <h5 className="text-sm font-semibold text-gray-500 mb-2">
            Article ID:{" "}
            <span className="text-red-600 font-bold">{article.articleId}</span>
          </h5>

          <h2 className="text-2xl font-semibold mb-3">{article.title}</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">{article.content}</p>

          <p className="text-sm text-gray-500 mb-6">
            Created By:{" "}
            <span className="font-medium text-gray-700">
              {article.createdBy?.name || article.createdBy}
            </span>
          </p>

      
          <button
            onClick={handleSummarize}
            disabled={summarizing}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:bg-green-400"
          >
            {summarizing ? "Summarizing..." : "Summarize"}
          </button>

        
          {summary && (
            <div className="mt-8 p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Summarized Text:</h3>
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {summary}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);


};

export default Summarizer;

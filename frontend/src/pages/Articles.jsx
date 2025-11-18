



import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

const API_URL = "http://localhost:5000/articles";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  
  const fetchArticles = async () => {
    try {
      const res = await axios.get(API_URL, config);
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form, config);
        alert("Article updated successfully!");
      } else {
        await axios.post(API_URL, form, config);
        alert("Article created successfully!");
      }
      setForm({ title: "", content: "" });
      setEditingId(null);
      fetchArticles();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      console.log("Error details:", err.response?.data);
      alert("Failed to save article. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, config);
      fetchArticles();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  
  const handleEdit = (article) => {
    setForm({ title: article.title, content: article.content });
    setEditingId(article._id);
  };

  






 return (
  <div className="min-h-screen w-full bg-gray-100">
   
    <NavBar />

  
    <div className="w-full mt-10 bg-white shadow-md rounded-none p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        {editingId ? "Edit Article" : "Create Article"}
      </h2>

  
      <form
        onSubmit={handleSubmit}
        className="space-y-5 mb-10 max-w-3xl mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Article Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          required
        />

        <textarea
          name="content"
          placeholder="Article Content"
          value={form.content}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none min-h-[150px]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Article"
            : "Add Article"}
        </button>
      </form>

     
      <div className="w-full px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((a) => (
            <div
              key={a._id}
              className="border p-5 rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition"
            >
              <h5 className="text-sm font-semibold text-gray-500 mb-1">
                Article ID:{" "}
                <span className="text-red-600 font-bold">{a.articleId}</span>
              </h5>
              <h3 className="font-bold text-lg mb-2">{a.title}</h3>
              <p className="text-gray-700 mb-3">{a.content}</p>
              <p className="text-sm text-gray-500 mb-4">
                Created By:{" "}
                <span className="font-medium text-gray-700">
                  {a.createdBy?.name || a.createdBy}
                </span>
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(a)}
                  className="flex-1 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a._id)}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No articles found.
          </p>
        )}
      </div>
    </div>
  </div>
);


};

export default Articles;


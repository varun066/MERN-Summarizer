import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

// Define the base URL using the environment variable
const BASE_URL = import.meta.env.VITE_BACKEND_URL; 
// Define the full API endpoint for this request
const SIGNUP_API_URL = `${BASE_URL}/auth/signup`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(SIGNUP_API_URL, form);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
        console.log(err.response);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

 return (
  <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  </div>
);

};

export default Signup;

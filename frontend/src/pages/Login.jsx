import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/signin", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/articles"); // You can create a dashboard page later
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
  <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
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
          Login
        </button>
      </form>

      <p className="text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  </div>
);

};

export default Login;

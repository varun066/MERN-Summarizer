
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  
  

  return (
<div className="w-screen min-h-screen bg-white shadow-md rounded-none p-8 text-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Welcome to Suvidha Summarizer
      </h1>

      <nav className="flex justify-center space-x-4">
        <Link
          to="/signup"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Login
        </Link>
      </nav>
    </div>
  );
};

export default Dashboard;

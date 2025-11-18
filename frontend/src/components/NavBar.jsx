import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await fetch("http://localhost:5000/auth/signout", {
        method: "POST",
        headers: {
          Authorization:`Bearer ${localStorage.getItem("token")}`,
          
        },
      });
    } catch (err) {
      console.error("Sign out failed:", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  
  return (
    <nav className="w-full bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-lg">Suvidha Summarizer</h1>
        <div className="space-x-6">
          <Link to="/articles"
          className="px-4 py-2 border border-white rounded-lg hover:bg-blue-700 hover:border-blue-300 text-white transition">

            Articles
          </Link>
          <Link to="/summarizer"          
           className="px-4 py-2 border border-white rounded-lg hover:bg-blue-700 hover:border-blue-300 text-white transition">
            Summarizer
          </Link>
          <Link
  to="/history"
           className="px-4 py-2 border border-white rounded-lg hover:bg-blue-700 hover:border-blue-300 text-white transition">

  History
</Link>
<button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg font-medium"
        >
          Sign Out
        </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

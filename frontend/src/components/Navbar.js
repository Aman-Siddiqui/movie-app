import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-[#083344] text-white">
      <h1 className="text-xl font-bold">My movies ☺️</h1>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-300 hover:text-white"
      >
        Logout ⎋
      </button>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center w-full max-w-5xl mb-6 px-8 py-4  text-white">
     
      <button
          onClick={() => navigate("/create")}
          className="px-6 py-3  rounded-md text-gray-300 hover:text-white transition"
        >
          My Movies  ➕
        </button>
      <button
        onClick={handleLogout}
        className=" text-gray-300 hover:text-white"
      >
        Logout ⎋
      </button>
    </div>
  );
}

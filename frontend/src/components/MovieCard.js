import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const imageUrl = movie.posterPath
    ? `http://localhost:3001${movie.posterPath}`
    : "https://via.placeholder.com/200";

  return (
    <div className="bg-[#0f4c5c] rounded-lg p-3 text-center shadow-md relative">
      <img
        src={imageUrl}
        alt={movie.title}
        className="rounded-md mb-2 mx-auto w-full h-64 object-cover"
      />

      <div className="flex justify-between items-center">
        <div className="text-left">
          <h3 className="text-white font-semibold">{movie.title}</h3>
          <p className="text-gray-300 text-sm">{movie.year}</p>
        </div>

        <button
          onClick={() => navigate(`/movies/edit/${movie.id}`)}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

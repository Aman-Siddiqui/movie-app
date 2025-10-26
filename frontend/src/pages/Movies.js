import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  console.log("react Moviess",movies)
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const res = await fetch("http://localhost:3001/movies", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setMovies(data.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-[#0D3B45] text-white flex flex-col items-center p-6">
      <div className="flex justify-between w-full max-w-5xl mb-6">
        <h1 className="text-3xl font-bold">Movies List</h1>
        <button
          onClick={() => navigate("/create")}
          className="px-6 py-3 bg-green-500 rounded-md text-white hover:bg-green-600 transition"
        >
          Add a new movie
        </button>
      </div>

      {movies.length === 0 ? (
        <p className="text-gray-400">No movies available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;

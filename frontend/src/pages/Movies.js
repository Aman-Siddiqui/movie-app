import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";

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

      
        <Navbar/>
     
     <div className="w-full max-w-5xl mx-auto" >
      {movies.length === 0 ? (
        <p className="text-gray-400">No movies available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Movies;

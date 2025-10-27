import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [posterFile, setPosterFile] = useState(null);
  const [preview, setPreview] = useState(null);

   useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        const res = await fetch(`http://localhost:3001/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setTitle(data.title);
        setYear(data.year);
        if (data.posterPath) {
          setPreview(`http://localhost:3001${data.posterPath}`);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPosterFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    try {
      let response;

      if (posterFile) {
        // If a new image is uploaded, use FormData
        const formData = new FormData();
        formData.append("title", title);
        formData.append("year", year);
        formData.append("poster", posterFile);

        response = await fetch(`http://localhost:3001/movies/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      } else {
        
        response = await fetch(`http://localhost:3001/movies/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, year }),
        });
      }

      if (response.ok) {
        alert("Movie updated successfully!");
        navigate("/movies");
      } else {
        const errorData = await response.json();
        alert("Failed to update movie: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D3B45] flex items-center justify-center px-6 py-6 sm:px-8 sm:py-8">

      <div className="w-full max-w-4xl bg-transparent p-8 rounded-lg">
        <h1 className="text-2xl font-semibold text-white mb-8">Edit</h1>

        <form
          onSubmit={handleUpdate}
          className="flex flex-col sm:flex-row sm:gap-8 items-center sm:items-start gap-6"
        >
          <label
            htmlFor="image-upload"
            className="w-full sm:w-80 h-64 sm:h-80 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center cursor-pointer text-gray-300 hover:border-gray-300 transition relative"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center">
                <div className="text-3xl mb-2">⬆️</div>
                <p>Drop other image here</p>
              </div>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          <div className="flex flex-col w-full max-w-sm space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#0B2F38] text-white placeholder-gray-400 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 w-full sm:w-auto"
            />
            <input
              type="text"
              placeholder="Publishing year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-[#0B2F38] text-white placeholder-gray-400 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />

           <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
  <button
    type="button"
    onClick={() => navigate("/movies")}
    className="px-6 py-3 border border-gray-400 rounded-md text-white hover:bg-gray-700 transition w-full sm:w-auto"
  >
    Cancel
  </button>
  <button
    type="submit"
    className="px-6 py-3 bg-green-500 rounded-md text-white hover:bg-green-600 transition w-full sm:w-auto"
  >
    Update
  </button>
</div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;

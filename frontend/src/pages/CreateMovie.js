import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateMovie = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [posterFile, setPosterFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPosterFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !year || !posterFile) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
   formData.append("poster", posterFile);


    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await fetch("http://localhost:3001/movies/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Movie added successfully!");
        navigate("/movies");
      } else {
        const errorData = await response.json();
        alert("Failed to add movie: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D3B45] flex items-center justify-center px-6 py-6 sm:px-8 sm:py-8">

      <div className="w-full max-w-4xl bg-transparent p-8 rounded-lg">
        <h1 className="text-2xl font-semibold text-white mb-8">
          Create a new movie
        </h1>

        <form
          onSubmit={handleSubmit}
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
                <p>Drop an image here</p>
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
  className="bg-[#0B2F38] text-white placeholder-gray-400 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 w-full sm:w-auto"
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
    Submit
  </button>
</div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMovie;

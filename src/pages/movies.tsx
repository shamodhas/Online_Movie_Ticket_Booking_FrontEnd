import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MovieCard from "../components/card/movie-card";
import DeleteIcon from "../assets/icons/delete";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadAllMovies(currentPage);
  }, []);

  const loadAllMovies = async (page: number) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/movie/all?size=6&page=" + page
      );
      setMovies(response.data.data);
      setTotalPages(response.data.pageCount);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Fail to load movies",
      });
      console.log(err);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    loadAllMovies(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    loadAllMovies(currentPage - 1);
  };

  const handleDeleteMovie = async (movie: any) => {
    console.log(movie._id)
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showLoaderOnConfirm: true,
        showConfirmButton: false,
      });

      const response = await axios.delete(
        "http://localhost:8080/movie/" + movie._id,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YjZhYjQ4NWMxZmE1NmViNzZkYTRkMSIsIm5hbWUiOiJ0ZXN0VHJlZSIsImVtYWlsIjoidGVzdDNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIiLCJtb2JpbGVOdW1iZXIiOiIwNzc4ODg4ODg4Iiwic3RhdHVzIjoiQWN0aXZlIiwicm9sZSI6IlRIRUFURVJfRU1QTE9ZRUUiLCJfX3YiOjB9LCJpYXQiOjE3MDY0NzAyODUsImV4cCI6MTcwNzA3NTA4NX0.5cpb5VPIQxIlcQ1iaYOTDV8qWcEgE8JqyyQS79K7l9Y",
          },
        }
      );
      loadAllMovies(currentPage);
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Movie deleted",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(response.data);
    } catch (error: any) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div className="grid justify-center items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 m-5">
        {movies.map((movie: any, index) => {
          return (
            <div>
              <MovieCard
                key={index}
                image={movie.imageUrl}
                name={movie.name}
                language={movie.language}
              />
              <div className="flex justify-center items-center mt-5">
                <button
                  onClick={() => {
                    handleDeleteMovie(movie);
                  }}
                  className="bg-white rounded-xl w-[40px]"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-white flex justify-center items-center m-5">
        <button
          className="bg-transparent-1 py-1 px-5 w-fit disabled:bg-black"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 whitespace-nowrap">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="bg-transparent-1 py-1 px-5 w-fit disabled:bg-black"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

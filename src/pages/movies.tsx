import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MovieCard from "../components/card/movie-card";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const movieEndPoint = import.meta.env.VITE_MOVIE_END_POINT;

  useEffect(() => {
    loadAllMovies(currentPage);
  }, []);

  const loadAllMovies = async (page: number) => {
    try {
      const response = await axios.get(
        `${movieEndPoint}/all?size=${5}&page=${page}`
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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 m-5">
        {movies.map((movie: any, index) => {
          return (
            <MovieCard
              key={index}
              image={movie.imageUrl}
              name={movie.name}
              language={movie.language}
            />
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

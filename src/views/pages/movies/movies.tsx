import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import MovieCard from "../../../components/card/movie-card"
import LoadingContext from "../../../context/loading-context"
import { getAllMovies } from "../../../services/movie"
import { toast } from "react-toastify"

export default function Movies() {
  const [, setLoading] = useContext(LoadingContext)

  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const movieEndPoint = import.meta.env.VITE_MOVIE_END_POINT

  useEffect(() => {
    //getDataHandler(currentPage)
  }, [])

  const getDataHandler = async (page = 1) => {
    setLoading(true)
    await getAllMovies(page, 5)
      .then((res) => {
        if (res.success) {
          setMovies(res.data ?? [])
        } else {
          toast.error("Fail to load data")
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // const loadAllMovies = async (page: number) => {
  //   try {
  //     Swal.fire({
  //       title: "Loading...",
  //       allowOutsideClick: false,
  //       didOpen: () => {
  //         Swal.showLoading()
  //       }
  //     })

  //     const response = await apiService.get(
  //       `${movieEndPoint}/all?size=${5}&page=${page}`,
  //       {
  //         headers: {
  //           verifyAuth: false
  //         }
  //       }
  //     )

  //     setMovies(response.data.data)
  //     setTotalPages(response.data.pageCount)
  //     Swal.close()
  //   } catch (err) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Fail to load movies"
  //     })
  //     console.log(err)
  //   }
  //   // finaly need new loader
  // }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
    loadAllMovies(currentPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    loadAllMovies(currentPage - 1)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 m-5">
        {movies.map((movie: any, index) => {
          return (
            <MovieCard
              key={index}
              image={movie.imageUrl}
              name={movie.name}
              language={movie.language}
            />
          )
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
  )
}

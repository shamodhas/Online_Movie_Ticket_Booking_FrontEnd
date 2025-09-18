import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import MovieCard from "../../../components/card/movie-card"
import DeleteIcon from "../../../assets/icons/delete"
import EditIcon from "../../../assets/icons/edit"
import { useLocation, useNavigate } from "react-router-dom"
import LoadingContext from "../../../context/loading-context"
import { getAllMovies } from "../../../services/movie"
import { toast } from "react-toastify"

function MyMovies() {
  const navigate = useNavigate()
  const location = useLocation()
  const [, setLoading] = useContext(LoadingContext)


  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState<number>(
    location?.state?.currentPage ?? 1
  )
  const [totalPages, setTotalPages] = useState(1)


  useEffect(() => {
    //  getDataHandler(currentPage)
  }, [currentPage])

  const getDataHandler = async (page: number) => {
    setLoading(true)
    await getAllMovies(page, 5)
      .then((res:any) => {
        if (res.success) {
          setMovies(res.data ?? [])
          setTotalPages(res.pageCount ?? 0)
        } else {
          toast.error("Fail to load data")
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleDeleteMovie = async (_:any) => {
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showLoaderOnConfirm: true,
        showConfirmButton: false
      })

      getDataHandler(currentPage)
      Swal.close()
      Swal.fire({
        icon: "success",
        title: "Movie deleted",
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error: any) {
      Swal.close()
      Swal.fire({
        icon: "error",
        title: error.response.data.message
      })
      console.log(error.response.data.message)
    }
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleGoAddMovie = () => {
    navigate("/movie-editor", {
      state: { currentPage }
    })
  }

  const handleEditMovie = (movie: any) => {
    navigate("/movie-editor", {
      state: { movie, currentPage }
    })
  }

  return (
    <div>
      <div className="flex justify-center items-center mt-5 text-white">
        <button
          onClick={handleGoAddMovie}
          className="bg-transparent-1 font-bold text-xl py-1 px-5 w-fit hover:text-black hover:bg-white"
        >
          Add New Movie
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 m-5">
        {movies.map((movie: any, index) => {
          return (
            <div key={index} className="flex flex-col justify-between">
              <MovieCard
                image={movie.imageUrl}
                name={movie.name}
                language={movie.language}
              />
              <div className="flex justify-center items-center mt-3 gap-1">
                <button
                  onClick={() => {
                    handleDeleteMovie(movie)
                  }}
                  className="bg-transparent-1 rounded-xl w-[40px] hover:bg-red-600"
                >
                  <DeleteIcon color={"white"} />
                </button>
                <button
                  onClick={() => {
                    handleEditMovie(movie)
                  }}
                  className="bg-transparent-1 rounded-xl w-[40px] h-[40px] hover:bg-yellow-600"
                >
                  <EditIcon color="white" />
                </button>
              </div>
            </div>
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
    </div>
  )
}

export default MyMovies

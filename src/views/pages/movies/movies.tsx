import { useContext, useEffect, useState } from "react"
import MovieCard from "../../../components/card/movie-card"
import LoadingContext from "../../../context/loading-context"
import { getAllMovies } from "../../../services/movie"
import { toast } from "react-toastify"

export default function Movies() {
  const [, setLoading] = useContext(LoadingContext)

  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    getDataHandler(currentPage)
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

  const handleNextPage = (e: any) => {
    e.preventDefault()
    setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = (e: any) => {
    e.preventDefault()
    setCurrentPage(Math.max(currentPage - 1, 1))
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 m-5">
        {movies.map((movie: any, index) => {
          return (
            <MovieCard
              key={index}
              image={movie.imageUrl}
              name={movie.title}
              language={movie.language}
            />
          )
        })}
      </div>
      {totalPages > 0 && (
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
      )}
    </>
  )
}

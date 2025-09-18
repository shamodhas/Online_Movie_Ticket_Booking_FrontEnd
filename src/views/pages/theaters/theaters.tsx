import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getAllTheaters } from "../../../services/theaters"
import { toast } from "react-toastify"
import LoadingContext from "../../../context/loading-context"
import { useNavigate } from "react-router-dom"
import UserContext from "../../../context/user-context"
import { ADMIN, THEATER_EMPLOYEE } from "../../../types/user"
import constant from "../../../configs/constant"

export default function Theaters() {
    console.log(localStorage.getItem(constant.ACCESS_TOKEN))

  const [, setLoading] = useContext(LoadingContext)
  const navigate = useNavigate()

  const [theaters, setTheaters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [user] = useContext(UserContext)

  useEffect(() => {
    getDataHandler(currentPage)
  }, [currentPage])

  const getDataHandler = async (page: number) => {
    setLoading(true)
    await getAllTheaters(page, 5)
      .then((res) => {
        if (res.success) {
          setTheaters(res.data ?? [])
          setTotalPages(res.pageCount ?? 0)
        } else {
          toast.error("Fail to load data")
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
    getDataHandler(currentPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    getDataHandler(currentPage - 1)
  }

  const handleGoAddTheater = () => {
    navigate("/theater-editor", {
      state: { currentPage }
    })
  }

  const handleGoAddHalls = () => {
    navigate("/theater-halls", {
      state: { currentPage }
    })
  }

  return (
    <div className="w-full h-full ">
      {(user.role === THEATER_EMPLOYEE || user.role === ADMIN) && (
        <div className="flex justify-center items-center mt-5 text-white gap-4">
          <button
            onClick={handleGoAddTheater}
            className="bg-transparent-1 font-bold text-xl py-1 px-5 w-fit hover:text-black hover:bg-white"
          >
            Add New Theater
          </button>
          {/* <button
            onClick={handleGoAddHalls}
            className="bg-transparent-1 font-bold text-xl py-1 px-5 w-fit hover:text-black hover:bg-white"
          >
            Halls
          </button> */}
        </div>
      )}
      <div className="bg-transparent-1 m-8 rounded-lg p-8">
        <table className="w-full">
          <thead className="bg-transparent-1 text-lg text-black">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              {/* <th>Contact</th> */}
            </tr>
          </thead>
          <tbody className="text-white">
            {theaters?.map((theater: any, index) => {
              const id = index + 1

              return (
                <tr
                  className="text-center text-base border-b animate animate-tada"
                  key={index}
                >
                  <td className="py-2">{id}</td>
                  <td className="py-2">{theater.name}</td>
                  <td className="py-2">{theater.location}</td>
                  {/* <td className="py-2">{theater.mobileNumber}</td> */}
                </tr>
              )
            })}
          </tbody>
        </table>
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
    </div>
  )
}
